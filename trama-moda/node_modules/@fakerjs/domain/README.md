<h1 align="center">Domain</h1>
<p align="center">Domain package provides functionality to generate a fake domain value.</p>

<p align="center">
<a href="https://github.com/faker-javascript/domain/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/domain.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/domain"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/domain"> <a href="https://github.com/faker-javascript/domain/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/domain/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/domain"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

```
$ npm install --save @fakerjs/domain
```

## Usage

```js
import domain from '@fakerjs/domain';

domain();
//=> rad.com

domain({tld: 'rad.com'});
//=> totally.rad.com
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/domain/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
