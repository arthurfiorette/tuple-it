// uses async/await instead of then here because promise might not be a promise.
async function tuple(maybePromise) {
  try {
    return [null, await maybePromise]
  } catch (error) {
    // Wraps error into a TupleItError if it's not an instance of Error
    if (!(error instanceof Error)) {
      return [new TupleItError(error)]
    }

    return [error]
  }
}

class TupleItError extends Error {
  constructor(error) {
    super('Promise rejected with a non instance of Error')
    this.error = error
  }
}

exports.tuple = tuple
exports.t = tuple
exports.TupleItError = TupleItError
