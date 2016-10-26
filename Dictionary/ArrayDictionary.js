'use strict';
var ArrayDictionary = (function () {
    function ArrayDictionary(init) {
        this._keys = [];
        this._values = [];
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }
    ArrayDictionary.prototype.add = function (key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    };
    ArrayDictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    ArrayDictionary.prototype.keys = function () {
        return this._keys;
    };
    ArrayDictionary.prototype.values = function () {
        return this._values;
    };
    ArrayDictionary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    };
    ArrayDictionary.prototype.toLookup = function () {
        return this;
    };
    return ArrayDictionary;
}());
exports.ArrayDictionary = ArrayDictionary;
//# sourceMappingURL=ArrayDictionary.js.map