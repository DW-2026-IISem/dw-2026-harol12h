<h1 align="center">Letter</h1>
<p align="center">
Letter package provides functionality to generate a fake letter value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/letter/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/letter.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/letter"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/letter"> <a href="https://github.com/faker-javascript/letter/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/letter/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/letter"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/letter --save-dev
```

yarn
```
yarn add @fakerjs/letter -D
```

## Usage

```js
import letter from '@fakerjs/letter';

letter();
//=> z

letter({'casing': 'upper'});
//=> Z

letter({'casing': 'upper', 'locale': 'ru_RU'});
//=> Я
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/letter/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
