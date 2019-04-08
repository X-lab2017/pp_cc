## 实验目的
本次实验介绍了如何使用[TensorFlow](https://www.tensorflow.org/)构建简单的神经网络体系结构、训练模型和评估结果时。本次实验基于MNIST数据集，将解决分类任务并尝试从其手写表示中识别实际数字。
![MNIST-classification](https://upload-images.jianshu.io/upload_images/6252440-56a6a071e367cc47.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 实验内容

#### 1. 加载MNIST数据集
TensorFlow已经内置了数据集，因此无需手动下载。

要使用MNIST，首先需要导入基础包：
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

#### 2. 训练数据
我们的任务是使用TensorFlow构建分类神经网络。 首先，我们需要构建架构和训练网络（使用训练集），然后评估测试集上的结果。

下图显示了分类过程和神经网络的各个层：
![network](https://upload-images.jianshu.io/upload_images/6252440-6315e5570c898890.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

为了向网络提供训练数据，我们需要展平数字图像。不同的数据将会根据不同的阶段（训练或测试）分别推送给分类器。 训练过程将基于标签，同时将它们与当前预测进行比较，因此，我们需要定义两个占位符。
```
# Define placeholders
training_data = tf.placeholder(tf.float32, [None, image_size*image_size])
labels = tf.placeholder(tf.float32, [None, labels_size])
```

#### 3. 网络变量
占位符将被填充为评估计算图时传递的值。 但训练的实际目标是调整权重和偏差的值。这就是为什么我们需要允许在整个过程中改变值的结构。

TensorFlow通过提供变量来达到此目的。权重的初始值将遵循正态分布，而偏差将获得值1.0。 一旦我们定义了它们，输出层的创建只是一行。
```
# Variables to be tuned
W = tf.Variable(tf.truncated_normal([image_size*image_size, labels_size], stddev=0.1))
b = tf.Variable(tf.constant(0.1, shape=[labels_size]))

# Build the network (only output layer)
output = tf.matmul(training_data, W) + b
```

#### 4. 损失函数优化
训练过程通过优化（最大化或最小化）损失函数来工作。 在我们的例子中，我们希望最小化网络预测和实际标签值之间的差异。 在深度学习中，我们经常使用称为交叉熵的技术来定义损失。

TensorFlow提供了名为tf.nn.softmax_cross_entropy_with_logits的函数，该函数在内部对模型的非标准化预测应用softmax，并对所有类进行求和。 tf.reduce_mean函数取这些总和的平均值。 这样我们就可以获得可以进一步优化的函数。 在我们的示例中，我们使用tf.train API中的梯度下降方法。
```
# Define the loss function
loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(labels=labels, logits=output))

# Training step
train_step = tf.train.GradientDescentOptimizer(learning_rate).minimize(loss)
```

梯度下降优化器将在几个步骤中调整W和b变量的值。 我们还希望有一种评估性能的方法。

首先，我们想通过使用tf.argmax函数来比较哪些标签被正确预测。 tf.equal返回布尔列表，因此通过将值转换为float，然后计算平均值，我们最终得到模型的准确性。
```
# Accuracy calculation
correct_prediction = tf.equal(tf.argmax(output, 1), tf.argmax(labels, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
```
#### 5. 训练

现在我们可以构建计算图，可以开始训练过程。 首先，我们需要初始化先前定义的会话和变量。
```
# Run the training
sess = tf.InteractiveSession()
sess.run(tf.global_variables_initializer())
```
如前所述，优化器按步骤工作。 在我们的例子中，我们在循环内部运行train_step，为其提供批处理数据：图和相应的标签。现在我们使用函数run的feed_dict参数填充占位符。
```
for i in range(steps_number):
  # Get the next batch
  input_batch, labels_batch = mnist.train.next_batch(batch_size)
  feed_dict = {training_data: input_batch, labels: labels_batch}

  # Run the training step
  train_step.run(feed_dict=feed_dict)
```
我们可以利用先前定义的accuracy来监控训练过程中批次的性能。 通过添加以下代码，我们将每100步打印出一个值。
```
  # Print the accuracy progress on the batch every 100 steps
  if i%100 == 0:
    train_accuracy = accuracy.eval(feed_dict=feed_dict)
    print("Step %d, training batch accuracy %g %%"%(i, train_accuracy*100))
```

#### 6. 模型评估
在训练结束后，我们要检查在测试集上网络的性能。我们可以重复使用准确性并将其与训练数据一起提供，而不是训练批次。

```
# Evaluate on the test set
test_accuracy = accuracy.eval(feed_dict={training_data: mnist.test.images, labels: mnist.test.labels})
print("Test accuracy: %g %%"%(test_accuracy*100))
```
整体代码已经完成，我们可以在实训环境中运行以下命令来运行代码：
```
# cd /tensorflow
# python app.py
```
最后，尝试更改一些值，例如learning_rate或steps_number，看看是否可以影响准确性。