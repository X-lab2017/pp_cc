# ceph实训任务

## 实验背景

Ceph是一个可靠地、自动重均衡、自动恢复的分布式存储系统，根据场景划分可以将Ceph分为三大块，分别是对象存储、块设备存储和文件系统服务。在虚拟化领域里，比较常用到的是Ceph的块设备存储，比如在OpenStack项目里，Ceph的块设备存储可以对接OpenStack的cinder后端存储、Glance的镜像存储和虚拟机的数据存储，比较直观的是Ceph集群可以提供一个raw格式的块存储来作为虚拟机实例的硬盘。

Ceph相比其它存储的优势点在于它不单单是存储，同时还充分利用了存储节点上的计算能力，在存储每一个数据时，都会通过计算得出该数据存储的位置，尽量将数据分布均衡，同时由于Ceph的良好设计，采用了CRUSH算法、HASH环等方法，使得它不存在传统的单点故障的问题，且随着规模的扩大性能并不会受到影响。

## 实验目的
完成ceph块操作实验。

## 实验步骤
#### 1. 检查ceph集群状态

`$ceph health`

#### 2. 使用ceph block storage配置一个块设备，在执行这个操作之前要先安装一个ceph client节点（注：ceph client最好安装在一个虚拟机上，不要安装在ceph的存储集群上）。

###### 2.1 在ceph-client节点上创建一个块设备镜像:

```
$rbd create foo --size 4096 [-m {mon-IP}] [-k /path/to/ceph.client.admin.keyring]
```

###### 2.2 把镜像映射到块设备:

```
$ sudo rbd map foo --pool rbd --name client.admin [-m {mon-IP}] [-k /path/to/ceph.client.admin.keyring]
```

###### 2.3 在ceph client节点上通过创建一个文件系统来使用块设备：

`$sudo mkfs.ext4 –m0 /dev/rbd/rbd/foo`

###### 2.4 在ceph client节点上挂载文件系统：

```
$ sudo mkdir /mnt/ceph-block-device
$ sudo mount /dev/rbd/rbd/foo  /mnt/ceph-block-device
$ cd /mnt/ceph-block-device
```

###### 2.5 测试测试性能

`$ sudo dd if=/dev/zero of=hello7.txt bs=1000M count=1`