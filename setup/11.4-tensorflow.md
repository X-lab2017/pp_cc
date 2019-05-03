# 4. 损失函数优化
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