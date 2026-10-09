<h1 align="center">House</h1>
<p align="center">House package provides functionality to generate a fake house value.</p>

<p align="center">
<a href="https://github.com/faker-javascript/house/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/house.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/house"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/house"> <a href="https://github.com/faker-javascript/house/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/house/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/house"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/house --save-dev
```

yarn
```
yarn add @fakerjs/house -D
```

## Usage

```js
import house from '@fakerjs/house';

house({locale: 'en_US'}).room();
//=> kitchen 
// Allowed locale: en_US

house().room();
//=> kitchen

house().furniture();
//=> chair
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/house/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
