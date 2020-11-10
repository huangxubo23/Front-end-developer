## 仅使用内建的错误对象

JS 天生的宽容性及其多变的代码流选项（例如 EventEmitter, Callbacks, Promises 等等）使得开发者有太多引发错误的方式，有些人使用字符串，有些人使用自定义的类型。使用 Node.js 的内置错误对象有助于在你的代码和第三方库之间保持一致性，它还保留了重要信息，比如 StackTrace。当引发异常时，给异常附加上下文属性（如错误名称和相关的 HTTP 错误代码）通常是一个好的习惯。要实现这种一致性和实践，请考虑使用附加属性扩展错误对象，见下面的代码示例。

### 代码示例-正确做法

```
//从典型函数抛出错误, 无论是同步还是异步
if(!productToAdd) {
  throw new Error("How can I add new product when no value provided?");
}

//从EventEmitter抛出错误
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));

//从promise抛出错误
return new promise(function (resolve, reject) {
  Return DAL.getProduct(productToAdd.id).then((existingProduct) => {
    if(existingProduct != null) {
      reject(new Error("Why fooling us and trying to add an existing product?"));
    }
  });
});
```

### 代码示例-反例

```
//抛出字符串错误缺少任何stack trace信息和其他重要属性
if(!productToAdd) {
  throw ("How can I add new product when no value provided?");
}
```

### 代码示例–更好做法

```
//从node错误派生的集中错误对象
function appError({ name, status, message }) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = name;
  this.status = status;
  this.message = message;
};

appError.prototype = Object.create(Error.prototype);
appError.prototype.constructor = appError;

module.exports.appError = appError;

//客户端抛出一个错误
if(user == null) {
  throw new appError({
    name: commonErrors.resourceNotFound, 
    status: commonHTTPErrors.notFound,
    message: 'further explanation'
  });
}
```

```
/**
 * ES5自定义Error类型
 */
// Create a new object, that prototypally inherits from the Error constructor.
function CustomError(message) {
  this.name = 'CustomError';
  this.message = message || 'Default Message';
  this.stack = (new Error()).stack;
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.toJSON = function() {
  return {
    name: this.name,
    message: this.message,
    stack: this.stack
  }
};
CustomError.prototype.constructor = CustomError;

try {
  throw new CustomError('Custom message');
} catch (error) {
  console.log(error.name + ':' + error.message); // CustomError:Custom message
  if (error instanceof CustomError) {
    console.error(error.toJSON());
  }
}
```

```
/**
 * ES6自定义Error类型
 */
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
  }

  // 序列化错误对象
  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stack: this.stack
      }
    }
  }
}

try {
  throw new ValidationError('A validation error');
} catch (error) {
  // error instanceof ValidationError
  if (error.name === 'ValidationError') {
    console.error('Handle validation error:', error.toJSON());
  } else {
    console.log('Handle other errors', error);
  }
}
```
