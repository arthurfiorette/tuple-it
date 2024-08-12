import type { Result } from './lib/result';

declare global {
  interface Promise<T> {
    /**
     * Always resolves the promise successfully into a `[error, null]` or `[null, result]` tuple.
     *
     * **This promise never rejects.**
     *
     * @example
     *
     * ```ts
     * const [error, result] = await promise.tuple();
     * const [error, result] = await myAsyncFn().tuple();
     * const [error, result] = await Promise.all(promises).tuple();
     * const [error, result] = await Promise.race(promises).tuple();
     * ```
     */
    tuple<E = Error>(this: this): Promise<Result<T, E>>;
  }

  // same as CallableFunction, but when type strictness is not enabled
  interface Function {
    /**
     * Calls the function and returns a `[error, null]` or `[null, result]` tuple.
     *
     * **This function never throws.**
     *
     * Use {@linkcode Function.prototype.tupleBound} to call with a custom `this` value.
     *
     * @example
     * ```ts
     * const [error, result] = JSON.parse.tuple('invalid json');
     * const [error] = fs.writeFileSync.tuple('author.txt', 'Arthur Fiorette');
     * const [error, result] = myFunction.tuple(arg1, arg2);
     * ```
     */
    tuple<E = Error>(this: Function, thisArg: any, ...argArray: any[]): Result<any, E>;

    /**
     * Calls the function with a custom `this` value and returns a `[error, null]` or `[null, result]` tuple.
     *
     * Similar to {@linkcode Function.prototype.call}, but returns a tuple instead of throwing.
     *
     * **This function never throws.**
     *
     * @example
     * ```ts
     * const [error, result] = instance.method.tupleBound(instance);
     * const [error, result] = instance.method.tupleBound(instance, arg1, arg2);
     * ```
     */
    tupleBound<E = Error>(
      this: Function,
      thisArg: any,
      ...argArray: any[]
    ): Result<any, E>;
  }

  interface CallableFunction {
    /**
     * Calls the function and returns a `[error, null]` or `[null, result]` tuple.
     *
     * **This function never throws.**
     *
     * Use {@linkcode Function.prototype.tupleBound} to call with a custom `this` value.
     *
     * @example
     * ```ts
     * const [error, result] = JSON.parse.tuple('invalid json');
     * const [error] = fs.writeFileSync.tuple('author.txt', 'Arthur Fiorette');
     * const [error, result] = myFunction.tuple(arg1, arg2);
     * ```
     */
    tuple<A extends unknown[], R>(this: (...args: A) => R, ...args: A): Result<R>;

    /**
     * Calls the function with a custom `this` value and returns a `[error, null]` or `[null, result]` tuple.
     *
     * Similar to {@linkcode Function.prototype.call}, but returns a tuple instead of throwing.
     *
     * **This function never throws.**
     *
     * @example
     * ```ts
     * const [error, result] = instance.method.tupleBound(instance);
     * const [error, result] = instance.method.tupleBound(instance, arg1, arg2);
     * ```
     */
    tupleBound<T, A extends unknown[], R>(
      this: (this: (this: T) => unknown, ...args: A) => R,
      thisArg: T,
      ...args: A
    ): Result<R>;
  }
}
