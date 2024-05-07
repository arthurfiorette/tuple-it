// uses async/await instead of then here because it might not be a promise.
async function tuple(maybePromise) {
  try {
    return [null, await maybePromise]
  } catch (error) {
    // Avoids the need to check if error !== undefined in favor of a simpler if (error)
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
