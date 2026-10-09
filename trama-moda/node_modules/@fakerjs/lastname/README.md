<h1 align="center">Lastname</h1>
<p align="center">
Lastname package provides functionality to generate a fake last name value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/lastname/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/lastname.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/lastname"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/lastname"> <a href="https://github.com/faker-javascript/lastname/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/lastname/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/lastname"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

```
$ npm install --save @fakerjs/lastname
```

## Usage

```js
import lastName from '@fakerjs/lastname';

lastName();
//=> Roberts

lastName({locale: 'en_US'});
//=> Roberts

// Allowed locale: en_US, ru_RU, pl_PL, uk_UA, it_IT, de_DE, fr_FR
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/lastname/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
