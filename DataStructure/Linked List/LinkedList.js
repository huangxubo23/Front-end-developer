/*
 |--------------------------------------------------------------------------
 | Name        : Linked List
 | Version     : 1.0
 | Author      : Harry Huang
 | Time        : 2016/10/31
 |--------------------------------------------------------------------------
 */

/*
* Node 类
* element属性：用来保存节点上的数据
* next属性：用来保存指向下一个节点的链接。
*/
function Node(element) {
    this.element = element;
    this.next = null;
    // 双向链表
    this.previous = null;
}

/*
* LinkedList 类
*/
function LList() {
    this.head = new Node('head');
    // 循环链表
    //this.head.next = this.head;
}

LList.prototype.find = function (item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
};

LList.prototype.insert = function (newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
};

LList.prototype.display = function () {
    var currNode = this.head;
    while (!(currNode === null)) {
        currNode.next !== null && console.log(currNode.next.element);
        currNode = currNode.next;
    }
};

LList.prototype.findPrevious = function (item) {
    var currNode = this.head;
    while (currNode !== null && currNode.next.element !== item) {
        currNode = currNode.next;
    }
    return currNode;
};

LList.prototype.remove = function (item) {
    // var prevNode = this.findPrevious(item);
    // if (prevNode !== null) {
    //     prevNode.next = prevNode.next.next;
    // }

    var currNode = this.find(item);
    if (currNode.next !== null) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
};

LList.prototype.findLast = function () {
    var currNode = this.head;
    while (currNode.next !== null) {
        currNode = currNode.next;
    }
    return currNode;
};

LList.prototype.dispReverse = function () {
    var currNode = this.findLast();
    while (currNode.previous !== null) {
        console.log(currNode.element);
        currNode = currNode.previous;
    }
};