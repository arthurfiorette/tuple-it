import type { Result, Err, Ok } from './result';

/**
 * Calls the function and returns a {@linkcode Err} or `[null, result]` tuple.
 *
 * **This function never throws.**
 *
 * Use {@linkcode tupleBound} to call with a custom `this` value.
 *
 * @example
 *
 * ```ts
 * const [error, result] = t(JSON.parse, 'invalid json');
 * const [error, result] = t(fs.writeFileSync, 'author.txt', 'Arthur Fiorette');
 * const [error, result] = t(myFunction, arg1, arg2);
 * ```
 */
export declare function tuple<E = Error, R = unknown, A extends unknown[] = []>(
  fn: (...args: A) => R,
  ...args: A
): Result<R, E>;

/**
 * Returns a promise that resolves to a tuple containing the result of the promise.
 *
 * **This promise never rejects.**
 *
 * @example
 *
 * ```ts
 * const [error, result] = await t(promise);
 * ```
 */
export declare function tuple<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>>;

/**
 * Returns a promise that resolves to a tuple containing the result of the promise.
 *
 * **This promise never rejects.**
 *
 * @example
 *
 * ```ts
 * const [error, result] = await t(promise);
 * ```
 */
export declare function tuple<T, E = Error>(
  promise: PromiseLike<T>
): PromiseLike<Result<T, E>>;

/**
 * Helper function for cases where functions may not return a promise.
 *
 * **This promise never rejects.**
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
export declare function tuple<T, E = Error>(
  notPromise: T | PromiseLike<T>
): Promise<Result<T, E>>;

/**
 * Calls the function with a bound `this` and returns a `[error, null]` or `[null, result]` tuple.
 *
 * **This function never throws.**
 *
 * @example
 *
 * ```ts
 * const [error, result] = tupleBound(instance, 'method');
 * const [error, result] = tupleBound(instance, 'method', ...args);
 * ```
 */
export declare function tupleBound<
  E = Error,
  R = unknown,
  I = unknown,
  K extends keyof I = keyof I
>(
  instance: I,
  key: K,
  ...args: I[K] extends (...args: infer U) => R ? U : never
): Result<R, E>;

/**
 * Calls the function with a bound `this` and returns a `[error, null]` or `[null, result]` tuple.
 *
 * Alias for {@linkcode tupleBound}.
 */
export declare const tb: typeof tupleBound;

/**
 * Transforms a promise into a tuple containing the result of the promise.
 *
 * Alias for {@linkcode tuple}.
 */
export declare const t: typeof tuple;
