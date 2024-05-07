function __tupleResolve(value) {
  return [null, value];
}

function __tupleReject(error) {
  if (!(error instanceof Error)) {
    return [new TupleItError(error)];
  }

  return [error];
}

Object.defineProperty(Promise.prototype, 'tuple', {
  // Prevents the property from being listed by Object.getOwnPropertyNames
  enumerable: false,
  value() {
    return this.then(__tupleResolve, __tupleReject);
  }
});
