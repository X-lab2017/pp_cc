# 3. MapReduce基本操作实验

## 实验目的
熟悉MapReduce的架构和基本操作。查看官方给的例子，在Hadoop的伪分布式模式下，以grep为实验对象了解执行MapReduce作业的过程，了解mapper函数和reducer函数。

## 实验原理
Hadoop MapReduce是一个使用简易的软件框架，基于它写出来的应用程序能够运行在由上千个商用机器组成的大型集群上，并以一种可靠容错的方式并行处理上TB级别的数据集。

一个MapReduce作业（job）通常会把输入的数据集切分为若干独立的数据块，由map任务（task）以完全并行的方式处理它们。框架会对map的输出先进行排序， 然后把结果输入给reduce任务。通常作业的输入和输出都会被存储在 文件系统中。 整个框架负责任务的调度和监控，以及重新执行已经失败的任务。

通常，MapReduce框架和分布式文件系统是运行在一组相同的节点上的，也就是说，计算节点和存储节点通常在一起。这种配置允许框架在那些已经存好数据的节点上高效地调度任务，这可以使整个集群的网络带宽被非常高效地利用。

MapReduce框架由一个单独的master和每个集群节点一个slave共同组成。master负责调度构成一个作业的所有任务，这些任务分布在不同的slave上，master监控它们的执行，重新执行已经失败的任务。而slave仅负责执行由master指派的任务。

## 实验步骤

### 3.1 启动YARN
```
# cd /usr/local/hadoop
# sbin/start-yarn.sh
```

### 3.2 查看hadoop官方给了哪些例子

```
# cd bin
# hadoop jar ../share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar
```

### 3.3 以grep例子作为实验，查看grep例子的用法
grep例子的作用是给出一个正则表达式和一系列文件（也可以是单个文件），统计正则表达式匹配到的单词的次数。

想要知道具体某个例子怎么使用，可以在上面的命令后面跟上这个例子的名称加--help:

```
# hadoop jar ../share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep --help
```

可以看到，grep例子后面跟着的是输入文件目录和输出文件目录，然后是正则表达式。

### 3.4 创建要处理的数据

我们先在Hadoop安装目录/usr/local/hadoop下创建一个文件，使用如下命令快速创建：
```
# cd /usr/local/hadoop
# echo "hello world.the world is hadoop world" > input.txt
# cat input.txt 
hello world.the world is hadoop world

# bin/hdfs dfs -put input.txt /
```

echo 命令会输出双引号中的字符串，而>命令则将输出重定向到文件input.txt中。


### 3.5 用hadoop命令提交作业，运行作业

```
# bin/hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar grep /input.txt output world
```
### 3.6 查看结果

```
# bin/hdfs dfs -cat output/p*
3    world
```
可以看到，在结果文件中显示，匹配到正则表达式：world的次数为3次。