const { err, ok } = require('./lib/result.js');
const { t, tb, tuple, tupleBound } = require('./lib/tuple.js');
const { TupleItError } = require('./lib/error.js');

module.exports.err = err;
module.exports.ok = ok;
module.exports.t = t;
module.exports.tb = tb;
module.exports.tuple = tuple;
module.exports.tupleBound = tupleBound;
module.exports.TupleItError = TupleItError;
