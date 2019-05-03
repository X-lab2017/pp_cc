# 5. 训练

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