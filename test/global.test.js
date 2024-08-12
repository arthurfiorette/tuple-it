require('../register')

const { describe, it } = require('node:test')
const assert = require('node:assert')
const { TupleItError } = require('../index')

describe('Promise prototype', async () => {
  it('should return a value when resolved', async () => {
    const testInput = 41
    const promise = Promise.resolve(testInput)

    const [err, data] = await promise.tuple()

    assert.strictEqual(err, null)
    assert.strictEqual(data, testInput)
  })

  it('should return an error when promise is rejected', async () => {
    const testErr = new Error('Test')
    const promise = Promise.reject(testErr)

    const [err, data] = await promise.tuple()

    assert.strictEqual(err, testErr)
    assert.strictEqual(data, undefined)
  })

  it('wraps non instances of Error into a TupleItError', async () => {
    const testErr = 'Test'
    const promise = Promise.reject(testErr)

    const [err, data] = await promise.tuple()

    assert.deepStrictEqual(err, new TupleItError(testErr))
    assert.strictEqual(data, undefined)
  })
})

describe('Function prototype', () => {
  it('returns a value when calling a function', () => {
    function ok() {
      return true
    }

    const [err, data] = ok.tuple()

    assert.strictEqual(err, null)
    assert.strictEqual(data, true)
  })

  it('returns a value when calling function fails', () => {
    const error = new Error('Test')

    function fail() {
      throw error
    }

    const [err, data] = fail.tuple()

    assert.strictEqual(err, error)
    assert.strictEqual(data, undefined)
  })

  it('returns a value when calling function non-Error fails', () => {
    const error = 'Test'

    function fail() {
      throw error
    }

    const [err, data] = fail.tuple()

    assert.deepStrictEqual(err, new TupleItError(error))
    assert.strictEqual(data, undefined)
  })

  it('works with parameters', () => {
    /**
     * @param {number} a
     * @param {number} b
     */
    function sum(a, b) {
      return a + b
    }

    const [err, data] = sum.tuple(2, 3)

    assert.strictEqual(err, null)
    assert.strictEqual(data, 5)
  })

  it('works with bound methods', () => {
    class Test {
      value = 42

      getValue() {
        return this.value
      }
    }

    const test = new Test()

    const [err, data] = test.getValue.tupleB(test)

    assert.strictEqual(err, null)
    assert.strictEqual(data, 42)
  })

  it('works with fail bound methods', () => {
    const error = new Error('Test')

    class Test {
      value = 42

      getValue() {
        throw error
      }
    }

    const test = new Test()
    const [err, data] = test.getValue.tupleB(test)

    assert.strictEqual(err, error)
    assert.strictEqual(data, undefined)
  })

  it('works with non-Error fail bound methods', () => {
    const error = 'Test'

    class Test {
      value = 42

      getValue() {
        throw error
      }
    }

    const test = new Test()

    const [err, data] = test.getValue.tupleB(test)

    assert.deepStrictEqual(err, new TupleItError(error))
    assert.strictEqual(data, undefined)
  })
})

function 