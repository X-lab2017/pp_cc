# 6. 模型评估
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
部分运行结果如下：
```
Step 0, training batch accuracy 15 %
Step 100, training batch accuracy 78 %
Step 200, training batch accuracy 80 %
Step 300, training batch accuracy 92 %
Step 400, training batch accuracy 95 %
Step 500, training batch accuracy 86 %
Step 600, training batch accuracy 87 %
Step 700, training batch accuracy 87 %
Step 800, training batch accuracy 88 %
Step 900, training batch accuracy 91 %
Test accuracy: 89.49 %
```
可以看到精确度约为89%(每次运行结果可能不相同)，效果并不是很理想。读者可以尝试更改一些值，例如learning_rate或steps_number，看看是否可以影响准确性。