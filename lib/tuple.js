const { err, ok } = require('./result.js');

/**
 * @template T
 * @param {T} instance
 * @param {keyof T} method
 * @param {...any} args
 */
function tupleBound(instance, method, ...args) {
  try {
    return ok(instance[method].apply(instance, args));
  } catch (error) {
    return err(error);
  }
}

/** @type {import('./tuple.d.ts').tuple} */
function tuple(fnOrPromise, ...args) {
  try {
    if (typeof fnOrPromise === 'function') {
      return ok(fnOrPromise(...args));
    }

    return ok(fnOrPromise);
  } catch (error) {
    return err(error);
  }
}

module.exports.t = tuple;
module.exports.tb = tupleBound;
module.exports.tuple = tuple;
module.exports.tupleBound = tupleBound;