# 1. 加载MNIST数据集
实训环境中已包含示例python文件app.py以及所需的数据集，放置目录为/tensorflow，读者可直接查看运行完整代码。

要使用MNIST，需要导入基础包：
```
import tensorflow as tf
from tensorflow.examples.tutorials.mnist import input_data

# Read data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)
```
上面的代码使用TensorFlow内置的函数将MNIST数据集下载到本地的MNIST_data/ 目录中，并将数据集加载到python变量中。

我们还需要定义一些将在代码中进一步使用的值：
```
image_size = 28
labels_size = 10
learning_rate = 0.05
steps_number = 1000
batch_size = 100
```