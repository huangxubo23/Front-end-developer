/*
 |--------------------------------------------------------------------------
 | Name        : Dictionary
 | Version     : 1.0
 | Author      : Harry Huang
 | Time        : 2016/10/26
 |--------------------------------------------------------------------------
 */

(function () {
    'use strict';

    function Dictionary() {
        this._size = 0;
        this._hasOwnProperty = Object.prototype.hasOwnProperty;
        this.dataStore = Object.create(null);
    }

    Dictionary.prototype.isEmpty = function () {
        return this._size === 0;
    };

    Dictionary.prototype.size = function () {
        return this._size;
    };

    Dictionary.prototype.hasKey = function (key) {
        return this._hasOwnProperty.call(this.dataStore, key);
    };

    Dictionary.prototype.add = function (key, value) {
        this._hasOwnProperty.call(this.dataStore, key) || this._size++;
        this.dataStore[key] = value;
    };

    Dictionary.prototype.find = function (key) {
        return this.dataStore[key];
    };

    Dictionary.prototype.remove = function (key) {
        this._hasOwnProperty.call(this.dataStore, key) && delete this.dataStore[key] && this._size--;
    };

    Dictionary.prototype.count = function () {
        if (this._hasOwnProperty.call(Object, 'keys')) {
            return Object.keys(this.dataStore).length;
        }

        var count = 0;
        for (var key in this.dataStore) {
            count++;
        }
        return count;
    };

    Dictionary.prototype.forEach = function (callback) {
        // Object.keys(this.dataStore).map(function (key) {
        //     callback(key, this.dataStore[key]);
        // });
        for (var key in this.dataStore){
            callback(key, this.dataStore[key]);
        }
    };

    Dictionary.prototype.clear = function(){
        // for(var key in this.datastore){
        //     delete this.datastore[key];
        // }
        this.dataStore = Object.create(null);
        this._size = 0;
    }

    module.exports = Dictionary;
})();