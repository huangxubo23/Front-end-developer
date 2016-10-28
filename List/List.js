/*
 |--------------------------------------------------------------------------
 | Name        : List
 | Version     : 1.0
 | Author      : Harry Huang
 | Time        : 2016/10/28
 |--------------------------------------------------------------------------
 */

function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
}

// append:给列表添加元素
List.prototype.append = function (element) {
    this.dataStore[this.listSize++] = element;
};

// remove:从列表删除元素
List.prototype.remove = function (element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        this.listSize--;
        return true;
    }
    return false;
};

// find:在列表中查找某一元素
List.prototype.find = function (element) {
    for (var i = 0, len = this.dataStore.length; i < len; i++) {
        if (this.dataStore[i] === element) {
            return i;
        }
    }
    return -1;
};

// length:获取列表元素个数
List.prototype.length = function () {
    return this.listSize;
}

// toString:显示列表中的元素
List.prototype.toString = function () {
    return this.dataStore;
};

// insert:向列表中插入一个元素
List.prototype.insert = function (element, after) {
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        this.listSize++;
        return true;
    }
    return false;
};

// clear:清空列表中所有的元素
List.prototype.clear = function(){
    this.dataStore.length = 0;
    this.listSize = this.pos = 0;
};

// contains:判断给定值是否在列表中
List.prototype.contains = function(element){
    return this.dataStore.indexOf(element) > -1;
};

/*
* 遍历列表
*/
// front:移动到列表中的第一个元素
List.prototype.front = function(){
    this.pos = 0;
};

// end:移动到列表中的最后一个元素
List.prototype.end = function(){
    this.pos = this.listSize - 1;
};

// prev:在列表中向前移动一个元素
List.prototype.prev = function(){
    if (this.pos > 0){
        --this.pos;
    }
};

// next:在列表中向后移动一个元素
List.prototype.next = function(){
    if(this.pos < this.listSize-1){
        ++this.pos;
    }
};

// currPos:获取当前位置
List.prototype.currPos = function(){
    return this.pos;
};

// moveTo:移动到列表的指定位置
List.prototype.moveTo = function(position){
    this.pos = position;
};

// getElement:返回列表的当前元素
List.prototype.getElement = function(){
    return this.dataStore[this.pos];
};