<h1 align="center">Gender</h1>
<p align="center">
Gender package provides functionality to generate a fake gender value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/gender/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/gender.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/gender"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/gender"> <a href="https://github.com/faker-javascript/gender/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/gender/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/gender"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/gender --save-dev
```

yarn
```
yarn add @fakerjs/gender -D
```

## Usage

```js
import gender from '@fakerjs/gender';

gender();
//=> Female

gender({locale: 'ru_RU'});
//=> Женский

gender({extra: ['Gender'], locale: 'en_US'});
//=> Gender

// Allowed extra: valid array
// Allowed locale: en_US, ru_RU
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/gender/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
