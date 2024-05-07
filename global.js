const { TupleItError } = require('./index.js')

function tupleResolve(value) {
  return [null, value]
}

function tupleReject(error) {
  if (!(error instanceof Error)) {
    return [new TupleItError(error)]
  }

  return [error]
}

Object.defineProperty(Promise.prototype, 'tuple', {
  // Prevents the property from being listed by Object.getOwnPropertyNames
  enumerable: false,
  value() {
    return this.then(tupleResolve, tupleReject)
  }
})
