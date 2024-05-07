/**
 * TupleResult represents the result of a promise as a tuple.
 *
 * - If the promise is rejected, the tuple will contain an Error object.
 * - If the promise is resolved, the tuple will contain null as the first element and the result as the second element.
 */
export type TupleResult<T> = [Error] | [null, T]

/**
 * Returns a promise that resolves to a tuple containing the result of the promise.
 *
 * @example Const [error, result] = await t(promise);
 */
export declare function tuple<T>(promise: Promise<T>): Promise<TupleResult<T>>

/**
 * Returns a promise that resolves to a tuple containing the result of the promise.
 *
 * @example Const [error, result] = await t(promise);
 */
export declare function tuple<T>(
  promise: PromiseLike<T>
): PromiseLike<TupleResult<T>>

/**
 * Helper function for cases where functions may not return a promise.
 *
 * @example
 *
 * ```ts
 * declare function myAsyncFn(): Promise<number> | number;
 *
 * // works even if the result is not a promise
 * const [error, result] = await t(myAsyncFn());
 * ```
 */
export declare function tuple<T>(notPromise: T | PromiseLike<T>): TupleResult<T>

/**
 * Transforms a promise into a tuple containing the result of the promise.
 *
 * Alias for {@linkcode tuple}.
 */
export declare const t: typeof tuple

/** Error thrown when a rejected promise is not an instance of {@linkcode Error}. */
export declare class TupleItError<E = unknown> extends Error {
  /** The error that caused the promise to be rejected. */
  error: E

  /** Creates a new instance of TupleItError. */
  constructor(error: E)
}
