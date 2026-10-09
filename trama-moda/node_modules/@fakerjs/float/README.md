<h1 align="center">Float</h1>
<p align="center">
Float package provides functionality to generate a fake float value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/float/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/float.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/float"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/float"> <a href="https://github.com/faker-javascript/float/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/float/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/float"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

```
$ npm install --save @fakerjs/float
```

## Usage

```js
import float from '@fakerjs/float';

float();
//=> -120920142888.5024

float({min: 0, max: 10});
//=> 7.6913

float({min: 0, max: 10, fixed: 6);
//=> 7.691312
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/float/blob/master/LICENSE.txt)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
