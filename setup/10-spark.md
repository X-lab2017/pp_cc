# Spark简介

**Apache Spark**是一个[开源](https://zh.wikipedia.org/wiki/%E5%BC%80%E6%BA%90 "开源")集群运算框架，最初是由加州大学柏克莱分校AMPLab所开发。相对于[Hadoop](https://zh.wikipedia.org/wiki/Apache_Hadoop "Apache Hadoop")的[MapReduce](https://zh.wikipedia.org/wiki/MapReduce "MapReduce")会在运行完工作后将中介数据存放到磁盘中，Spark使用了存储器内运算技术，能在数据尚未写入硬盘时即在存储器内分析运算。Spark在存储器内运行程序的运算速度能做到比Hadoop MapReduce的运算速度快上100倍，即便是运行程序于硬盘时，Spark也能快上10倍速度。Spark允许用户将数据加载至集群存储器，并多次对其进行查询，非常适合用于[机器学习](https://zh.wikipedia.org/wiki/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0 "机器学习")算法。

使用Spark需要搭配集群管理员和分布式存储系统。Spark支持独立模式（本地Spark集群）、[Hadoop YARN](https://zh.wikipedia.org/wiki/Apache_Hadoop "Apache Hadoop")或[Apache Mesos](https://zh.wikipedia.org/wiki/Apache_Mesos "Apache Mesos")的集群管理。在分布式存储方面，Spark可以和[HDFS](https://zh.wikipedia.org/wiki/Apache_Hadoop "Apache Hadoop")、 [Cassandra](https://zh.wikipedia.org/wiki/Apache_Cassandra "Apache Cassandra")、[OpenStack Swift](https://zh.wikipedia.org/wiki/OpenStack#Object_Storage_(Swift) "OpenStack")和[Amazon S3](https://zh.wikipedia.org/wiki/Amazon_S3 "Amazon S3")等接口搭载。 Spark也支持伪分布式（pseudo-distributed）本地模式，不过通常只用于开发或测试时以本机文件系统取代分布式存储系统。在这样的情况下，Spark仅在一台机器上使用每个CPU核心运行程序。

# 项目构成要素
Spark项目包含下列几项:

1. Spark核心和弹性分布式数据集（RDDs）
 Spark核心是整个项目的基础，提供了分布式任务调度，调度和基本的I/O功能。而其基础的程序抽象则称为弹性分布式数据集（RDDs），是一个可以并行操作、有容错机制的数据集合。 RDDs可以透过引用外部存储系统的数据集创建（例如：共享文件系统、HDFS、HBase或其他 Hadoop 数据格式的数据源）。或者是透过在现有RDDs的转换而创建（比如：map、filter、reduce、join等等）。
RDD抽象化是经由一个以[Scala](https://zh.wikipedia.org/wiki/Scala "Scala"), [Java](https://zh.wikipedia.org/wiki/Java "Java"), [Python](https://zh.wikipedia.org/wiki/Python "Python")的语言集成API所呈现，简化了编程复杂性，应用程序操纵RDDs的方法类似于操纵本地端的数据集合。

2. Spark SQL
Spark SQL在Spark核心上带出一种名为SchemaRDD的数据抽象化概念，提供结构化和半结构化数据相关的支持。Spark SQL提供了领域特定语言，可使用Scala、Java或Python来操纵SchemaRDDs。它还支持使用使用命令行界面和ODBC／JDBC服务器操作SQL语言。在Spark 1.3版本，SchemaRDD被重命名为DataFrame。

3. Spark Streaming
Spark Streaming充分利用Spark核心的快速调度能力来运行流分析。它截取小批量的数据并对之运行RDD转换。这种设计使流分析可在同一个引擎内使用同一组为批量分析编写而撰写的应用程序代码。

4. MLlib
MLlib是Spark上分布式机器学习框架。Spark分布式存储器式的架构比Hadoop磁盘式的[Apache Mahout](https://zh.wikipedia.org/w/index.php?title=Apache_Mahout&action=edit&redlink=1 "Apache Mahout（页面不存在）")快上10倍，扩展性甚至比[Vowpal Wabbit](https://zh.wikipedia.org/w/index.php?title=Vowpal_Wabbit&action=edit&redlink=1)要好。MLlib可使用许多常见的机器学习和统计算法，简化大规模机器学习时间。

5. GraphX
GraphX是Spark上的分布式图形处理框架。它提供了一组API，可用于表达图表计算并可以模拟Pregel抽象化。GraphX还对这种抽象化提供了优化运行。
GraphX最初为[加州大学柏克莱分校](https://zh.wikipedia.org/wiki/%E5%8A%A0%E5%B7%9E%E5%A4%A7%E5%AD%B8%E6%9F%8F%E5%85%8B%E8%90%8A%E5%88%86%E6%A0%A1 "加州大学柏克莱分校")AMPLab和Databricks的研究项目，后来捐赠给Spark项目。