async function tuple(maybePromise) {
  try {
    // await because then is not present on non-Promise objects
    return [null, await maybePromise]
  } catch (error) {
    // Wrapping into TupleItError avoids the need to check
    // `if (error !== undefined)` in favor of a simpler `if (error)`
    if (error instanceof Error) {
      return [error]
    }

    return [new TupleItError(error)]
  }
}

class TupleItError extends Error {
  error

  constructor(error) {
    super('Promise rejected with a non instance of Error')
    this.error = error
  }
}

exports.tuple = tuple
exports.t = tuple
exports.TupleItError = TupleItError
