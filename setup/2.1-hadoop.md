# 1. Hadoop简介

## Hadoop的组件
下图显示了 Hadoop 生态系统的各种组件。
![hadoop component](http://kfcoding-static.oss-cn-hangzhou.aliyuncs.com/gitcourse-ppcc/ppcc-hadoop-1.png)

## Apache Hadoop 由两个子项目组成 
- Hadoop MapReduce :
MapReduce 是一种计算模型及软件架构，编写在Hadoop上运行的应用程序。这些MapReduce程序能够对大型集群计算节点并行处理大量的数据。
- HDFS (Hadoop Distributed File System): 
HDFS 处理 Hadoop 应用程序的存储部分。 MapReduce应用使用来自HDFS的数据。HDFS创建数据块的多个副本，并集群分发它们到计算节点。这种分配使得应用可靠和极其迅速的计算。

虽然 Hadoop 是因为 MapReduce 和分布式文件系统 HDFS 而最出名的， 该术语也是在分布式计算和大规模数据处理的框架下的相关项目。 Apache Hadoop 的其他相关的项目包括有：Hive，HBase，Mahout，Sqoop , Flume 和 ZooKeeper。

## Hadoop 功能
- 适用于大数据分析
作为大数据在自然界中趋于分布和非结构化，Hadoop 集群最适合于大数据的分析。因为，它处理逻辑(未实际数据)流向计算节点，更少的网络带宽消耗。这个概念被称为数据区域性概念，它可以帮助提高基于 Hadoop 应用程序的效率。
- 可扩展性
HADOOP集群通过增加附加群集节点可以容易地扩展到任何程度，并允许大数据的增长。 另外，标度不要求修改到应用程序逻辑。
- 容错
HADOOP生态系统有一个规定，来复制输入数据到其他群集节点。这样一来，在集群某一节点有故障的情况下，数据处理仍然可以继续，通过使用存储另一个群集节点上的数据。