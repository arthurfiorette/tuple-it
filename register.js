const { ok, err } = require('./lib/result.js');

/**
 * @param {any} prototype
 * @param {string} field
 * @param {Function} value
 */
function globalAssign(prototype, field, value) {
  // Prevents the property from being listed by Object.getOwnPropertyNames
  Object.defineProperty(prototype, field, {
    enumerable: false,
    writable: false,
    configurable: false,
    value
  });
}

/** @this {Promise<any>} */
async function tupleP() {
  try {
    return ok(await this);
  } catch (error) {
    return err(error);
  }
}

/**
 * @param {...any} args
 * @this {Function}
 */
function tupleFn(...args) {
  try {
    return ok(this(...args));
  } catch (error) {
    return err(error);
  }
}

/**
 * @param {any} self
 * @param {...any} args
 * @this {Function}
 */
function tupleBound(self, ...args) {
  try {
    return ok(this.apply(self, args));
  } catch (error) {
    return err(error);
  }
}

globalAssign(Promise.prototype, 'tuple', tupleP);
globalAssign(Function.prototype, 'tuple', tupleFn);
globalAssign(Function.prototype, 'tupleBound', tupleBound);
