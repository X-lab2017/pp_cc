# KVM实训任务

## 实验目的
使用KVM新建虚拟机，并进行基本操作。

## 实验步骤
#### 1. 在创建虚拟机前先创建存放iso和虚拟机镜像文件的目录，使用mkdir命令创建iso和kvmimg两个目录。 

```
mkdir /home/dick/iso
mkdir /home/dick/kvming
```

#### 2. 将虚拟机需要安装的系统镜像文件复制到iso目录下，如将ubuntu-16.04.1-server-amd64.iso文件放在 /home/dick/iso目录下。

#### 3. 创建虚拟机前先查看当前系统是否有虚拟机。

使用命令：

```
virsh list –all
```

#### 4. 使用virt-instal命令创建一个新的虚拟机。

命令如下：

```
virt-install --virt-type kvm --name catserver1 --ram 1024 --cdrom=/home/dick/iso/ubuntu-16.04.1-server-amd64.iso --disk  path=/home/dick/kvmimg/catserver1.qcow2,size=10,format=qcow2 --network network=default --os-type=linux
```

命令输入正确后系统开始创建虚拟机，安装提示安装虚拟机的系统（采用控制台模式），安装完成后会重启虚拟机。

#### 5. 使用virsh list命令检测虚拟机创建结果，使用如下命令可以看到刚刚创建的虚拟机catserver1。

`$ virsh list –all`

#### 6. 通过命令启动和关闭虚拟机，如下命令完成虚拟机的启动和关闭。

```
$virsh start catserver1
$virsh shutdown catserver
```

