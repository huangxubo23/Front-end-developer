/*
 |--------------------------------------------------------------------------
 | Name        : Stack
 | Version     : 1.0
 | Author      : Harry Huang
 | Time        : 2016/10/28
 |--------------------------------------------------------------------------
 */

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