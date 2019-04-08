# Spark实训任务

## Spark简介

**Apache Spark**是一个[开源](https://zh.wikipedia.org/wiki/%E5%BC%80%E6%BA%90 "开源")集群运算框架，最初是由加州大学柏克莱分校AMPLab所开发。相对于[Hadoop](https://zh.wikipedia.org/wiki/Apache_Hadoop "Apache Hadoop")的[MapReduce](https://zh.wikipedia.org/wiki/MapReduce "MapReduce")会在运行完工作后将中介数据存放到磁盘中，Spark使用了存储器内运算技术，能在数据尚未写入硬盘时即在存储器内分析运算。Spark在存储器内运行程序的运算速度能做到比Hadoop MapReduce的运算速度快上100倍，即便是运行程序于硬盘时，Spark也能快上10倍速度。Spark允许用户将数据加载至集群存储器，并多次对其进行查询，非常适合用于[机器学习](https://zh.wikipedia.org/wiki/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0 "机器学习")算法。

使用Spark需要搭配集群管理员和分布式存储系统。Spark支持独立模式（本地Spark集群）、[Hadoop YARN](https://zh.wikipedia.org/wiki/Apache_Hadoop "Apache Hadoop")或[Apache Mesos](https://zh.wikipedia.org/wiki/Apache_Mesos "Apache Mesos")的集群管理。在分布式存储方面，Spark可以和[HDFS](https://zh.wikipedia.org/wiki/Apache_Hadoop "Apache Hadoop")、 [Cassandra](https://zh.wikipedia.org/wiki/Apache_Cassandra "Apache Cassandra")、[OpenStack Swift](https://zh.wikipedia.org/wiki/OpenStack#Object_Storage_(Swift) "OpenStack")和[Amazon S3](https://zh.wikipedia.org/wiki/Amazon_S3 "Amazon S3")等接口搭载。 Spark也支持伪分布式（pseudo-distributed）本地模式，不过通常只用于开发或测试时以本机文件系统取代分布式存储系统。在这样的情况下，Spark仅在一台机器上使用每个CPU核心运行程序。

##### 项目构成要素
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

## 实训1. 用Spark计算PI的值
Spark附带了几个示例程序。 Scala，Java，Python和R示例位于examples/src/main目录中。 要运行其中一个Java或Scala示例程序，请在顶级Spark目录中使用bin/run-example <class> [params]。下面介绍使用Spark计算PI的值。

进入Spark根目录，执行以下命令:
```
# cd /opt/spark/dist
# ./bin/run-example SparkPi 10
```
迭代10次以后得到PI的近似值
```
Pi is roughly 3.1393791393791393
```
Spark同时提供了Python版本的示例程序，通过以下命令执行PI计算：
```
# ./bin/spark-submit /opt/spark/dist/examples/src/main/python/pi.py
```
近似结果为
```
Pi is roughly 3.140280
```

## 实训2. 在spark-shell中执行词频统计
#### 2.1 编辑输入文件
本次实验统计某个文件中单词出现的次数，首先编辑输入文件。实训环境中已经提供了输入文件，路径为/root/input.txt，读者可根据需要自行编辑。文件的内容为：
> hello world hello spark hello hadoop

#### 2.2 启动spark-shell
执行以下命令启动spark-shell
```
# cd /opt/spark/dist
# ./bin/spark-shell
scala>
```
#### 2.3 加载本地文件
在开始具体词频统计代码之前，需要解决一个问题，就是如何加载文件？

要注意，文件可能位于本地文件系统中，也有可能存放在分布式文件系统HDFS中，本次实验只介绍如何加载本地文件，如何加载HDFS中的文件由读者探索。

然后输入下面命令加载文件：
```
scala> val textFile = sc.textFile("file:///root/input.txt")
```
上面代码中，val后面的是变量textFile，而sc.textFile()中的这个textFile是sc的一个方法名称，这个方法用来加载文件数据。这两个textFile不是一个东西，不要混淆。实际上，val后面的是变量textFile，你完全可以换个变量名称，比如,val lines = sc.textFile(“file:///root/input.txt”)。这里使用相同名称，就是有意强调二者的区别。

注意，要加载本地文件，必须采用“file:///”开头的这种格式。执行上上面这条命令以后，并不会马上显示结果，因为，Spark采用惰性机制，只有遇到“行动”类型的操作，才会从头到尾执行所有操作。所以，下面我们执行一条“行动”类型的语句，就可以看到结果：
```
scala> textFile.first()
```
first()是一个“行动”（Action）类型的操作，会启动真正的计算过程，从文件中加载数据到变量textFile中，并取出第一行文本。屏幕上会显示word.txt文件中的第一行的内容。

正因为Spark采用了惰性机制，在执行转换操作的时候，即使我们输入了错误的语句，spark-shell也不会马上报错，而是等到执行“行动”类型的语句时启动真正的计算，那个时候“转换”操作语句中的错误就会显示出来。

#### 2.4 词频统计
完整代码如下：
```
scala> val textFile = sc.textFile("file:///root/input.txt")
scala> val wordCount = textFile.flatMap(line => line.split(" ")).map(word => (word, 1)).reduceByKey((a, b) => a + b)
scala> wordCount.collect()
```
上面只给出了代码，省略了执行过程中返回的结果信息，因为返回信息很多。下面简单解释一下上面的语句。

textFile包含了多行文本内容，textFile.flatMap(line => line.split(” “))会遍历textFile中的每行文本内容，当遍历到其中一行文本内容时，会把文本内容赋值给变量line，并执行Lamda表达式line => line.split(” “)。line => line.split(” “)是一个Lamda表达式，左边表示输入参数，右边表示函数里面执行的处理逻辑，这里执行line.split(” “)，也就是针对line中的一行文本内容，采用空格作为分隔符进行单词切分，从一行文本切分得到很多个单词构成的单词集合。这样，对于textFile中的每行文本，都会使用Lamda表达式得到一个单词集合，最终，多行文本，就得到多个单词集合。textFile.flatMap()操作就把这多个单词集合“拍扁”得到一个大的单词集合。

然后，针对这个大的单词集合，执行map()操作，也就是map(word => (word, 1))，这个map操作会遍历这个集合中的每个单词，当遍历到其中一个单词时，就把当前这个单词赋值给变量word，并执行Lamda表达式word => (word, 1)，这个Lamda表达式的含义是，word作为函数的输入参数，然后，执行函数处理逻辑，这里会执行(word, 1)，也就是针对输入的word，构建得到一个tuple，形式为(word,1)，key是word，value是1（表示该单词出现1次）。

程序执行到这里，已经得到一个RDD，这个RDD的每个元素是(key,value)形式的tuple。最后，针对这个RDD，执行reduceByKey((a, b) => a + b)操作，这个操作会把所有RDD元素按照key进行分组，然后使用给定的函数（这里就是Lamda表达式：(a, b) => a + b），对具有相同的key的多个value进行reduce操作，返回reduce后的(key,value)，比如(“hello”,1)和(“hello”,1)，具有相同的key，进行reduce以后就得到(“hello”,2)，这样就计算得到了这个单词的词频。