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