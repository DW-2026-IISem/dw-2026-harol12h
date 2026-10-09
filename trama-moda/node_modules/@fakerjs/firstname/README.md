<h1 align="center">Firstname</h1>
<p align="center">
Firstname package provides functionality to generate a fake first name value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/firstname/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/firstname.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/firstname"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/firstname"> <a href="https://github.com/faker-javascript/firstname/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/firstname/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/firstname"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

```
$ npm install --save @fakerjs/firstname
```

## Usage

```js
import firstName from '@fakerjs/firstname';

firstName();
//=> Lia

firstName({locale: 'en_US', gender: 'female'});
//=> Liana

// Allowed gender: male, female
// Allowed locale: en_US, ru_RU, pl_PL, uk_UA, it_IT, de_DE, fr_FR
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/firstname/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
