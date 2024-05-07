<div align="center">
  <a title="MIT license" target="_blank" href="https://github.com/arthurfiorette/tupleit/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/arthurfiorette/tupleit"></a>
  <a title="Codecov" target="_blank" href="https://app.codecov.io/gh/arthurfiorette/tupleit"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/arthurfiorette/tupleit?token=ML0KGCU0VM"></a>
  <a title="NPM Package" target="_blank" href="https://www.npmjs.com/package/tupleit"><img alt="Downloads" src="https://img.shields.io/npm/dw/tupleit?style=flat"></a>
  <a title="Install size" target="_blank" href="https://packagephobia.com/result?p=tupleit"><img alt="Bundlephobia" src="https://packagephobia.com/badge?p=tupleit"></a>
  <a title="Last Commit" target="_blank" href="https://github.com/arthurfiorette/tupleit/commits/master"><img alt="Last commit" src="https://img.shields.io/github/last-commit/arthurfiorette/tupleit"></a>
  <a href="https://github.com/arthurfiorette/tupleit/stargazers"><img src="https://img.shields.io/github/stars/arthurfiorette/tupleit?logo=github&label=Stars" alt="Stars"></a>
</div>

<br />

<h1 align="center">
  Tuple it!
</h1>

<h3 align="center">
  A simple <code>async</code>/<code>await</code> to <code>[error, data]</code> catcher.
</h3>

<br />

- [Introduction](#introduction)
- [How to use](#how-to-use)
- [Avoiding polluting the global scope](#avoiding-polluting-the-global-scope)
- [The `TupleItError` class](#the-tupleiterror-class)
- [Promisable objects](#promisable-objects)
- [License](#license)
- [Credits](#credits)

<br />

## Introduction

**TupleIt** is a simple helper to make it easier to handle `async`/`await` errors.

It wraps the `await` statement into a `[error, data]` tuple, allowing you to easily check if the promise was rejected or resolved without nesting `try`/`catch` blocks.

It also easies the burden of checking for promise rejections, which are one of the **most common mistakes in JavaScript**.

<br />

## How to use

> [!CAUTION]
> Please do not extend the `Promise` prototype in a library, it's a bad practice.

<br />

**TupleIt** provides a `tupleit/register` import you can use in your main file to extend the `Promise` prototype.

```ts
import 'tupleit/register';
```

Then you can use the `.tuple()` method on any `Promise` object.

```ts
function work(promise: Promise<WorkData>) {
  const [error, data] = await promise.tuple();

  if (error) {
    console.log('fail!');
    return false;
  }

  console.log('success!');
  return true;
}
```

<br />

## Avoiding polluting the global scope

If you are developing a library, you shouldn't pollute the global scope. Instead, you can import the `t` _(alias to `tuple`)_ function directly.

```ts
import { t } from 'tupleit';

const [error, data] = await t(someAsyncFunction());
```

<br />

## The `TupleItError` class

Sometimes promises might reject a non error object, this is a super bad practice but it happens. **TupleIt** will wrap any non `Error` object into a `TupleItError` object if its not an instance of `Error`.

```ts
import { TupleItError } from 'tupleit';

async function someAsyncFunction() {
  throw 'Please never throw strings!';
}

const [error, data] = await someAsyncFunction().tuple();

if (error instanceof TupleItError) {
  console.error(error.error); // The original object that was thrown.
}
```

<br />

## Promisable objects

Sometimes functions returns values or promises to improve performance. **TupleIt** will handle this case as well.

```ts
import { t } from 'tupleit';

function someFunction() {
  if (Math.random() > 0.5) {
    return 'Hello, World!';
  } else {
    return Promise.resolve('Hello, World!');
  }
}

// Works in the same way!
const [error, data] = await t(someFunction());
```

<br />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
<br />

## Credits

This project is heavily inspired from [`await-to-js`](https://www.npmjs.com/package/await-to-js).

<br />
