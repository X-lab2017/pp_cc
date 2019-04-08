# Mininet实训任务

## 实验背景
Mininet 是一个轻量级软件定义网络和测试平台；它采用轻量级的虚拟化技术使一个单一的系统看起来像一个完整的网络运行相关的内核系统和用户代码，也可简单理解为 SDN 网络系统中的一种基于进程虚拟化平台，它支持 OpenFlow、OpenvSwith 等各种协议，Mininet 也可以模拟一个完整的网络主机、链接和交换机在同一台计算机上且有助于互动开发、测试和演示，尤其是那些使用 OpenFlow 和 SDN 技术；同时也可将此进程虚拟化的平台下代码迁移到真实的环境中。 

## 实验目的
在Ubuntu下Mininet的源码安装与简单测试。

## 实验步骤

#### 1. 从github上获取Mininet源码

`# git clone git://github.com/mininet/mininet`

#### 2. 查看当前获取版本

```
# cd mininet
# cat INSTALL
```

#### 3. 获取成功后，安装Mininet

```
# mininet/util/install.sh[options]
```

这里典型的[options]主要有下面几种：

- “-a": 完整安装包括Mininet VM，还包括如Open vSwitch的依赖关系，以及像的OpenFlow Wireshark分离器和POX。默认情况下，这些工具将被安装在你的home目录中。

- "-nfv": 安装Mininet、基于OpenFlow的交换机和Open vSwitch。

- "-s mydir": 在其他选项使用前使用此选项可将源代码建立在一个指定的目录中，而不是在你的home目录。

这里选择

`# install.sh –a		##完整安装（默认安装在home目录下）`

#### 4. 安装完成以后，通过简单的命令测试Mininet的基本功能

`# sudo mn --test pingall`

查看安装版本

`# mn –version`