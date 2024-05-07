import type { TupleResult } from './index.d.ts'

declare global {
  interface Promise<T> {
    /**
     * Transforms the promise into a tuple containing the result of the promise.
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
    tuple(this: this): Promise<TupleResult<T>>
  }
}
