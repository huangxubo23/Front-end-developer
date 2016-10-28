## 栈
`栈（Stack）`就是和列表（List）类似的一种数据结构，它可用来解决计算机世界里的很多问题。
栈是一种高效的数据结构，因为数据只能在栈顶添加或删除，所以这样的操作很快，而且容易实现。

### 对栈的操作
栈是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为`栈顶`。
栈被称为一种`后入先出（LIFO，last-in-first-out）`的数据结构。
由于栈具有后入先出的特点，所以任何不在栈顶的元素都无法访问。为了得到栈底的元素，必须先拿掉上面的元素。

对栈的两种主要操作是将一个元素压入栈和将一个元素弹出栈。入栈使用 `push()` 方法，出栈使用 `pop()` 方法。
另一个常用的操作是预览栈顶的元素。pop() 方法虽然可以访问栈顶的元素，但是调用该方法后，栈顶元素也从栈中被永久性地删除了。`peek()` 方法则只返回栈顶元素，而不删除它。

push()、pop() 和 peek() 是栈的 3 个主要方法，但是栈还有其他方法和属性。
我们使用属性 `length`，当向栈内压入元素时，该属性增大；从栈内弹出元素时，该属性减小。
`clear()`方法清除栈内所有元素，`length()`方法可以获取栈内元素的个数。

### 栈的代码实现
```
function Stack() {
    this.stack = [];
    this.length = 0;
}

// 入栈
Stack.prototype.push = function (data) {
    this.stack.push(data);
    this.length++;
};

// 出栈
Stack.prototype.pop = function (data) {
    this.length > 0 && this.length--;
    return this.stack.pop();
};

// 预览栈顶元素
Stack.prototype.peek = function () {
    var len = this.length();
    return len > 1 ? this.stack[len - 1] : void (0);
};

// 获取栈的总数
Stack.prototype.length = function () {
    return this.stack.length;
};

// 清空栈
Stack.prototype.clear = function () {
    this.stack.length = 0;
};
```
