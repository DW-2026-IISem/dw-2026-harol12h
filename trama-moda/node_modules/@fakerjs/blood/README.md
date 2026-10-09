<h1 align="center">Blood</h1>
<p align="center">Blood package provides functionality to generate a fake blood value.</p>

<p align="center">
<a href="https://github.com/faker-javascript/blood/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/blood.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/blood"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/blood"> <a href="https://github.com/faker-javascript/blood/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/blood/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/blood"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/blood --save-dev
```

yarn
```
yarn add @fakerjs/blood -D
```

## Usage

```js
import blood from '@fakerjs/blood';

blood().type();
//=> A

blood().rhFactor();
//=> +

blood().group();
//=> A+
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/blood/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
