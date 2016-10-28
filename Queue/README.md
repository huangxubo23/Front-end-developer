## 队列
`队列（Queue）`是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。
队列是一种`先进先出（First-In-First-Out，FIFO）`的数据结构。
队列用于存储按顺序排列的数据，先进先出，这点和栈不一样，在栈中，最后入栈的元素反而被优先处理。

### 对队列的操作
队列的两种主要操作是：向队列中插入新元素和删除队列中的元素。
插入操作也叫做入队，删除操作也叫做出队。`入队（enqueue）`操作在队尾插入新元素，`出队（dequeue）`操作删除队头的元素。

队列的另外一项重要操作是读取队头的元素。这个操作叫做 `peek()`。该操作返回队头元素，但不把它从队列中删除。
除了读取队头元素，我们还想知道队列中存储了多少元素，可以使用 `length` 属性满足该需求；要想清空队列中的所有元素，可以使用 `clear()` 方法来实现。

### 队列的代码实现
```
function Queue() {
    this.queue = [];
    this.length = 0;
}

// 入队
Queue.prototype.enqueue = function (data) {
    this.queue.push(data);
    this.length++;
};

// 出队
Queue.prototype.dequeue = function () {
    this.length > 0 && this.length--;
    return this.queue.shift();
};

// 预览队头的元素
Queue.prototype.peek = function () {
    return this.queue[0];
};

// 判断队列是否为空
Queue.prototype.isEmpty = function(){
    return this.queue.length === 0;
}

// 清空队列
Queue.prototype.clear = function () {
    this.isEmpty() || (this.queue.length = this.length = 0);
};
```