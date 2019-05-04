# 2. HDFS基本操作实验

## 2.1. 启动HDFS

进入Hadoop目录启动分布式文件系统。以下命令将启动namenode以及数据节点作为集群。

```
# service ssh restart
# cd /usr/local/hadoop
# sbin/start-dfs.sh
```

## 2.2. 将数据插入HDFS

假设我们在本地系统中的称为file.txt的文件中有数据，应该保存在hdfs文件系统中。按照以下步骤在Hadoop文件系统中插入所需的文件。

1.创建本地文件file.txt

`# touch /home/file.txt`

`# echo "hello world"  >  /home/file.txt`

2.您必须创建一个输入目录。

```
# hadoop fs -mkdir /user
# hadoop fs -mkdir /user/input
```

3.使用put命令将数据文件从本地系统传输并存储到Hadoop文件系统。

`# hadoop fs -put /home/file.txt /user/input`

4.可以使用ls命令验证文件。

`# hadoop fs -ls /user/input`


## 2.3. 从HDFS检索数据

现在我们在HDFS中已经有一个名为file.txt的文件。下面给出的是从Hadoop文件系统中检索所需文件的简单示例。

1.最初，使用cat命令查看HDFS中file.txt的数据。

`# hadoop fs -cat /user/input/file.txt`

2.使用get命令将文件从HDFS获取到本地文件系统。

```
# mkdir /home/hadoop_tp
# hadoop fs -get /user/input/ /home/hadoop_tp/
```

3.查看拉取的文件
```
# ls /home/hadoop_tp/input/
# cat /home/hadoop_tp/input/file.txt
hello world
```

## 2.4. 删除HDFS中所有数据

```
# hadoop fs -rm -r -f /user
```    