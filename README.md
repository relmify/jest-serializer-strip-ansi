# Jest Snapshot Serializer to Remove ANSI Escape Codes

## Problem

When you create your own custom jest matchers, you'll want to test that those matchers produce the
expected output strings when errors occur. Jest snapshots are a great way to do that. The problem
is, jest error output contains extra characters that add little value to your jest matcher tests and
make the snapshot text difficult to read and review.

One example is extra quotes and quote escape characters (`\`) which can be quite deeply nested in
some error output strings. You can use the `jest-snapshot-serializer-raw` package to help with
these.

A second problem is ANSI escape codes which apply color and formatting. There is a
`jest-snapshot-serializer-ansi` package to remove these codes, but it currently has dependencies
that are flagged as moderate vulnerabilities.

## Solution

`@relmify/jest-serializer-strip-ansi` removes ANSI escape codes from Jest snapshot captures, and
does so with no runtime dependencies.

## Installation

With npm:

```sh
npm install -D @relmify/jest-serializer-strip-ansi
```

With yarn:

```sh
yarn add -D @relmify/jest-serializer-strip-ansi
```

## Setup and Use

To use this snapshot serializer for all jest snapshots, add
`@relmify/jest-serializer-strip-ansi/always` to your jest configuration.

### Setup with package.json

In your `package.json` file add:

```json
"jest": {
  "snapshotSerializers": ["@relmify/jest-serializer-strip-ansi/always"]
}
```

Or if you are also using `jest-snapshot-serializer-raw`:

```json
"jest": {
  "snapshotSerializers": ["@relmify/jest-serializer-strip-ansi/always", "jest-snapshot-serializer-raw/always"]
}
```

### Setup with jest.config.js

```js
// jest.config.js
module.exports = {
  snapshotSerializers: ['@relmify/jest-serializer-strip-ansi/always'],
};
```

Or if you are also using `jest-snapshot-serializer-raw`:

```js
// jest.config.js
module.exports = {
  snapshotSerializers: ['@relmify/jest-serializer-strip-ansi/always', 'jest-snapshot-serializer-raw/always'],
};
```

If you want to use the serializer only in certain test files, then instead of adding the serializer to
your jest configuration, you can do the following:

```ts
import { stripAnsi } from '@relmify/jest-serializer-strip-ansi';

expect.addSnapshotSerializer(stripAnsi);
```

Note that you can add multiple snapshot serializers in your jest configuration (this can be helpful
if you want to also use a snapshot serializer like `jest-snapshot-serializer-raw`), but you can only
add one snapshot serializer at a time using `expect.addSnapshotSerializer()`. Calling
`expect.addSnapshotSerializer()` a second time will replace the previously added serializer.

## LICENSE

[MIT](/LICENSE)
