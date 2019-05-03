# 3. 网络变量
占位符将被填充为评估计算图时传递的值。 但训练的实际目标是调整权重和偏差的值。这就是为什么我们需要允许在整个过程中改变值的结构。

TensorFlow通过提供变量来达到此目的。权重的初始值将遵循正态分布，而偏差将获得值1.0。 一旦我们定义了它们，输出层的创建只是一行。
```
# Variables to be tuned
W = tf.Variable(tf.truncated_normal([image_size*image_size, labels_size], stddev=0.1))
b = tf.Variable(tf.constant(0.1, shape=[labels_size]))

# Build the network (only output layer)
output = tf.matmul(training_data, W) + b
```