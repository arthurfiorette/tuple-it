const { TupleItError } = require('./index.js')

function tupleResolve(value) {
  return [null, value]
}

function tupleReject(error) {
  if (error instanceof Error) {
    return [error]
  }

  return [new TupleItError(error)]
}

Object.defineProperty(Promise.prototype, 'tuple', {
  // Prevents the property from being listed by Object.getOwnPropertyNames
  enumerable: false,
  value: function tuple() {
    return this.then(tupleResolve, tupleReject)
  }
})
