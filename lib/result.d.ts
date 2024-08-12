import type { TupleItError } from './error';

/**
 * Result is a type that may contain an {@linkcode Err} or a {@linkcode Ok}.
 *
 * @example
 *
 * ```ts
 * const [error, data] = getResultSomehow();
 *
 * if (error) {
 *   // data is undefined, error is defined
 *   return handleError(error);
 * }
 *
 * // data is defined, error is undefined
 * return data;
 * ```
 */
export type Result<T, E = Error> = Err<E> | Ok<T>;

/**
 * A tuple with an error and no result.
 *
 * The error is an instance of {@linkcode Error} or a {@linkcode TupleItError}
 * if the error is not an instance of {@linkcode Error}.
 *
 * @template E the type of the error to return in the tuple
 * @see {@linkcode err} the function that creates this type
 */
export type Err<E = Error> = E extends Error ? TupleItError<E> : TupleItError<Error>;

/**
 * A tuple with a valid result and no error.
 *
 * @template D the type of the data to return in the tuple
 * @see {@linkcode ok} the function that creates this type
 */
export type Ok<D> = [null, D];

/**
 * Returns a tuple with an **error** and **no result**.
 *
 * @template E the type of the error to return in the tuple
 * @param error the error to return in the tuple
 */
export function err<E = Error>(error: E): [E];

/**
 * Returns a tuple with a **valid result** and **no error**.
 *
 * @template D the type of the data to return in the tuple
 * @param data the data to return in the tuple
 */
export function ok<D>(data: D): [null, D];
