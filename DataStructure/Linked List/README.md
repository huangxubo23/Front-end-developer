## 链表

### 数组的缺点
数组不总是组织数据的最佳数据结构，原因如下。在很多编程语言中，数组的长度是固定的，所以当数组已被数据填满时，再要加入新的元素就会非常困难。
在数组中，添加和删除元素也很麻烦，因为需要将数组中的其他元素向前或向后平移，以反映数组刚刚进行了添加或删除操作。
然而，JavaScript 的数组并不存在上述问题，因为使用 split() 方法不需要再访问数组中的其他元素了

JavaScript中数组的主要问题是，它们被实现成了对象，与其他语言（比如 C++ 和 Java）的数组相比，效率很低。
如果你发现数组在实际使用时很慢，就可以考虑使用链表来替代它。除了对数据的随机访问，链表几乎可以用在任何可以使用一维数组的情况中。
如果需要随机访问，数组仍然是更好的选择。

### 定义链表
`链表（Linked List）`是由一组节点组成的集合。每个节点都使用一个对象的引用指向它的后继。指向另一个节点的引用叫做链。
数组元素靠它们的位置进行引用，链表元素则是靠相互之间的关系进行引用。

遍历链表，就是跟着链接，从链表的首元素一直走到尾元素（但这不包含链表的头节点，头节点常常用来作为链表的接入点）。
然而要标识出链表的起始节点却有点麻烦，许多链表的实现都在链表最前面有一个特殊节点，叫做`头节点`。链表的尾元素指向一个 null 节点。

![有头节点的链表](https://github.com/huangxubo23/JavaScript/blob/master/DataStructure/Linked%20List/images/1%E6%9C%89%E5%A4%B4%E8%8A%82%E7%82%B9%E7%9A%84%E9%93%BE%E8%A1%A8.png)

链表中插入一个节点的效率很高。向链表中插入一个节点，需要修改它前面的节点（前驱），使其指向新加入的节点，而新加入的节点则指向原来前驱指向的节点。

![向链表插入元素](https://github.com/huangxubo23/JavaScript/blob/master/DataStructure/Linked%20List/images/2%E5%90%91%E9%93%BE%E8%A1%A8%E6%8F%92%E5%85%A5%E5%85%83%E7%B4%A0.png)

从链表中删除一个元素也很简单。将待删除元素的前驱节点指向待删除元素的后继节点，同时将待删除元素指向null，元素就删除成功了。

![从链表中删除元素](https://github.com/huangxubo23/JavaScript/blob/master/DataStructure/Linked%20List/images/3%E4%BB%8E%E9%93%BE%E8%A1%A8%E4%B8%AD%E5%88%A0%E9%99%A4%E5%85%83%E7%B4%A0.png)

链表还有其他一些操作，但插入和删除元素最能说明链表为什么如此有用。

### 设计一个基于对象的链表
我们设计的链表包含两个类。`Node类`用来表示节点，`LinkedList类`提供了插入节点、删除节点、显示列表元素的方法，以及其他一些辅助方法。

* Node类
Node 类包含两个属性：element 用来保存节点上的数据，next 用来保存指向下一个节点的链接。
我们使用一个构造函数来创建节点，该构造函数设置了这两个属性的值：

* LinkedList类
LList 类提供了对链表进行操作的方法。该类的功能包括插入删除节点、在列表中查找给定的值。
该类也有一个构造函数，链表只有一个属性，那就是使用一个 Node 对象来保存该链表的头节点。

```
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
````
