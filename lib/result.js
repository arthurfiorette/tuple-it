// These functions are dedicated and not inlined because nodejs/v8 is better to
// figure out the shape of the object when its only crated in one place.

const { TupleItError } = require('./error.js');

/** @type {import('./result.d.ts').ok} */
function ok(data) {
  return [null, data];
}

/** @type {import('./result.d.ts').err} */
function err(err) {
  if (err instanceof Error) {
    return [err];
  }

  return [new TupleItError(err)];
}

module.exports.ok = ok;
module.exports.err = err;
