/**
 * Error thrown when a rejected promise is not an instance of {@linkcode Error}.
 *
 * @template C the non-error object thrown by the promise or function
 */
export declare class TupleItError<C = unknown> extends Error {
  /** The error that caused the promise to be rejected. */
  cause: C;

  /** Creates a new instance of TupleItError. */
  constructor(cause: C);
}
