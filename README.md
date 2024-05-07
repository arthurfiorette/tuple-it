<div align="center">
  <a title="MIT license" target="_blank" href="https://github.com/arthurfiorette/tuple-it/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/arthurfiorette/tuple-it"></a>
  <a title="Bundle size" target="_blank" href="https://bundlephobia.com/package/tuple-it"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/tuple-it/latest"></a>
  <a title="Codecov" target="_blank" href="https://app.codecov.io/gh/arthurfiorette/tuple-it"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/arthurfiorette/tuple-it?token=ML0KGCU0VM"></a>
  <a title="NPM Package" target="_blank" href="https://www.npmjs.com/package/tuple-it"><img alt="Downloads" src="https://img.shields.io/npm/dw/tuple-it?style=flat"></a>
  <a title="Install size" target="_blank" href="https://packagephobia.com/result?p=tuple-it"><img alt="Bundlephobia" src="https://packagephobia.com/badge?p=tuple-it"></a>
  <a title="Last Commit" target="_blank" href="https://github.com/arthurfiorette/tuple-it/commits/master"><img alt="Last commit" src="https://img.shields.io/github/last-commit/arthurfiorette/tuple-it"></a>
  <a href="https://github.com/arthurfiorette/tuple-it/stargazers"><img src="https://img.shields.io/github/stars/arthurfiorette/tuple-it?logo=github&label=Stars" alt="Stars"></a>
</div>

<br />

<h1 align="center">
  Tuple it!
</h1>

<h3 align="center">
  A simple <code>Promise</code> to <code>[error, data]</code> catcher.
</h3>

<br />

- [Introduction](#introduction)
- [How to Use](#how-to-use)
- [Avoiding Global Scope Pollution](#avoiding-global-scope-pollution)
- [The `TupleItError` Class](#the-tupleiterror-class)
- [Promisable Objects](#promisable-objects)
- [Typescript Support](#typescript-support)
- [License](#license)
- [Credits](#credits)

<br />

## Introduction

**TupleIt** is a handy utility designed to simplify error handling with `async`/`await` operations in JavaScript.

It wraps the `await` statement in a `[error, data]` tuple, allowing you to easily discern whether a promise was rejected or resolved without resorting to nested `try`/`catch` blocks.

This not only enhances code readability but also mitigates one of the most common mistakes in JavaScript development - mishandling promise rejections.

<br />

## How to Use

> [!CAUTION]
> Extending the `Promise` prototype in a library is considered a horrible practice.

**TupleIt** provides an import `tuple-it/register` to extend the `Promise` prototype:

```typescript
import 'tuple-it/register'
```

Now, you can use the `.tuple()` method on any `Promise` object:

```typescript
async function work(promise: Promise<WorkData>) {
  const [error, data] = await promise.tuple()

  if (error) {
    console.log('Operation failed!')
    return false
  }

  console.log('Operation succeeded!')
  return true
}
```

<br />

## Avoiding Global Scope Pollution

If you're developing a library, it's advised not to pollute the global scope. Instead, you can import the `t` function directly (an alias for `tuple`):

```typescript
import { t } from 'tuple-it'

const [error, data] = await t(someAsyncFunction())
```

<br />

## The `TupleItError` Class

Occasionally, promises might reject with non-error objects, which is a poor practice but still happens. **TupleIt** will wrap any non-`Error` object into a `TupleItError` object if it's not an instance of `Error`:

```typescript
import { TupleItError } from 'tuple-it'

async function someAsyncFunction() {
  throw 'Please avoid throwing strings!'
}

const [error, data] = await someAsyncFunction().tuple()

if (error instanceof TupleItError) {
  console.error(error.error) // Logs the original object that was thrown.
}
```

<br />

## Promisable Objects

In some cases, functions may return either values or promises for performance optimization. **TupleIt** handles this scenario seamlessly:

```typescript
import { t } from 'tuple-it'

function someFunction() {
  if (Math.random() > 0.5) {
    return 'Hello, World!'
  } else {
    return Promise.resolve('Hello, World!')
  }
}

// Works the same way!
const [error, data] = await t(someFunction())
```

<br />

## Typescript Support

Typescript is fully supported:

```ts
import 'tuple-it/register'
import { t } from 'tuple-it'

// Custom error type (Defaults to Error)
const [customError, data] = await promise.then<CustomError>()

// Custom data type
const [error, customData] = await t<CustomData>(promise)

// Custom data and error types
const [customError, customData] = await t<CustomError, CustomData>(promise)
```

<br />

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<br />

## Credits

**TupleIt** draws heavy inspiration from [`await-to-js`](https://github.com/scopsy/await-to-js).

<br />
