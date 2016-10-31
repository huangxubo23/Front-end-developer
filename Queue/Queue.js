/*
 |--------------------------------------------------------------------------
 | Name        : Queue
 | Version     : 1.0
 | Author      : Harry Huang
 | Time        : 2016/10/28
 |--------------------------------------------------------------------------
 */

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
Queue.prototype.isEmpty = function () {
    return this.queue.length === 0;
};

// 清空队列
Queue.prototype.clear = function () {
    this.isEmpty() || (this.queue.length = this.length = 0);
};
