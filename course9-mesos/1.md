# Mesos实训任务

## Mesos简介
Mesos 最初由 UC Berkeley 的 AMP 实验室于 2009 年发起，遵循 Apache 协议，目前已经成立了 Mesosphere 公司进行运营。Mesos 可以将整个数据中心的资源（包括 CPU、内存、存储、网络等）进行抽象和调度，使得多个应用同时运行在集群中分享资源，并无需关心资源的物理分布情况。

如果把数据中心中的集群资源看做一台服务器，那么 Mesos 要做的事情，其实就是今天操作系统内核的职责：抽象资源+调度任务。Mesos 项目是 Mesosphere 公司 Datacenter Operating System (DCOS) 产品的核心部件。

Mesos 项目主要由 C++ 语言编写，项目官方地址为 http://mesos.apache.org，代码仍在快速演化中，已经发布了正式版 1.0.0 版本。

Mesos 拥有许多引人注目的特性，包括：
- 支持数万个节点的大规模场景（Apple、Twitter、eBay 等公司实践）；
- 支持多种应用框架，包括 Marathon、Singularity、Aurora 等；
- 支持 HA（基于 ZooKeeper 实现）；
- 支持 Docker、LXC 等容器机制进行任务隔离；
- 提供了多个流行语言的 API，包括 Python、Java、C++ 等；
- 自带了简洁易用的 WebUI，方便用户直接进行操作。

值得注意的是，Mesos 自身只是一个资源抽象的平台，要使用它往往需要结合运行其上的分布式应用（在 Mesos 中被称作框架，framework），比如 Hadoop、Spark 等可以进行分布式计算的大数据处理应用；比如 Marathon 可以实现 PaaS，快速部署应用并自动保持运行；比如 ElasticSearch 可以索引海量数据，提供灵活的整合和查询能力……

大部分时候，用户只需要跟这些框架打交道即可，完全无需关心底下的资源调度情况，因为 Mesos 已经自动帮你实现了。这大大方便了上层应用的开发和运维。

当然，用户也可以基于 Mesos 打造自己的分布式应用框架。

## Mesos基本操作

#### 访问 Mesos 图形界面
Mesos 自带了 Web 图形界面，可以方便用户查看集群状态。

用户在 Mesos 主节点服务和从节点服务都启动后，可以通过浏览器访问主节点 5050 端口，看到类似如下界面，已经有两个 slave 节点加入了。

!(Mesos)[http://kfcoding.oss-cn-hangzhou.aliyuncs.com/72834c7d93e34a62915affbf7270d26f/resources/1528358804757.png]

#### 访问 Marathon 图形界面
Marathon 服务启动成功后，在 Mesos 的 web 界面的 Frameworks 标签页下面将能看到名称为 marathon 的框架出现。同时可以通过浏览器访问 8080 端口，看到 Marathon 自己的管理界面。

!(Marathon)[http://kfcoding.oss-cn-hangzhou.aliyuncs.com/72834c7d93e34a62915affbf7270d26f/resources/1528358835508.png]

此时，可以通过界面或者 REST API 来创建一个应用，Marathon 会保持该应用的持续运行。
!(Marathon)[http://kfcoding.oss-cn-hangzhou.aliyuncs.com/72834c7d93e34a62915affbf7270d26f/resources/1528358847105.png]

通过界面方式可以看到各任务支持的参数（包括资源、命令、环境变量、健康检查等），同时可以很容易地修改任务运行实例数进行扩展，非常适合进行测试。

如果要更自动化地使用 Marathon，则需要通过它的 REST API 进行操作。

一般的，启动新任务需要先创建一个定义模板（JSON 格式），然后发到指定的 API。

例如，示例任务 basic-0 的定义模板为：

```
{
    "id": "basic-0",
    "cmd": "while [ true ] ; do echo 'Hello Marathon' ; sleep 5 ; done",
    "cpus": 0.1,
    "mem": 10.0,
    "instances": 1
}
```

该任务申请资源为 0.1 个单核 CPU 资源和 10 MB 的内存资源，具体命令为每隔五秒钟用 shell 打印一句 Hello Marathon。

可以通过如下命令发出 basic-0 任务到 Marathon 框架，框架会分配任务到某个满足条件的从节点上，成功会返回一个 json 对象，描述任务的详细信息。

```
$ curl -X POST http://marathon_host:8080/v2/apps -d @basic-0.json -H "Content-type: application/json"
{"id":"/basic-0","cmd":"while [ true ] ; do echo 'Hello Marathon' ; sleep 5 ; done","args":null,"user":null,"env":{},"instances":1,"cpus":0.1,"mem":10,"disk":0,"executor":"","constraints":[],"uris":[],"storeUrls":[],"ports":[0],"requirePorts":false,"backoffSeconds":1,"backoffFactor":1.15,"maxLaunchDelaySeconds":3600,"container":null,"healthChecks":[],"dependencies":[],"upgradeStrategy":{"minimumHealthCapacity":1,"maximumOverCapacity":1},"labels":{},"acceptedResourceRoles":null,"version":"2015-12-28T05:33:05.805Z","tasksStaged":0,"tasksRunning":0,"tasksHealthy":0,"tasksUnhealthy":0,"deployments":[{"id":"3ec3fbd5-11e4-479f-bd17-813d33e43e0c"}],"tasks":[]}%
```