const { TupleItError } = require('./index.js')

/** @param {unknown} value */
function tupleResolve(value) {
  return [null, value]
}

/** @param {unknown} error  */
function tupleReject(error) {
  if (error instanceof Error) {
    return [error]
  }

  return [new TupleItError(error)]
}

/** @this {Promise} */
function tuple() {
  return this.then(tupleResolve, tupleReject)
}

Object.defineProperty(Promise.prototype, 'tuple', {
  // Prevents the property from being listed by Object.getOwnPropertyNames
  enumerable: false,
  value: tuple
})
