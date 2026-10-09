<h1 align="center">Profession</h1>
<p align="center">
Profession package provides functionality to generate a fake profession value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/profession/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/profession.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/profession"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/profession"> <a href="https://github.com/faker-javascript/profession/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/profession/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/profession"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/profession --save-dev
```

yarn
```
yarn add @fakerjs/profession -D
```

## Usage

```js
import profession from '@fakerjs/profession';

profession();
//=> Software Engineer

profession({rank: true});
//=> Lead Software Engineer

profession({rank: true, locale: 'en_US'});
//=> Lead Software Engineer

// Allowed rank: true, false
// Allowed locale: en_US
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/profession/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
