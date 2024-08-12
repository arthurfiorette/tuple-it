class TupleItError extends Error {
  // helps v8/nodejs to figure out the shape of the object
  cause;

  constructor(cause) {
    super('Promise rejected with a non instance of Error');
    this.cause = cause;
  }
}

exports.TupleItError = TupleItError;
