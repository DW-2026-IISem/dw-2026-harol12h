<h1 align="center">Animal</h1>
<p align="center">
Animal package provides functionality to generate a fake animal value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/animal/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/animal.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/animal"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/animal"> <a href="https://github.com/faker-javascript/ip/actions/workflows/animal.yml"><img src="https://github.com/faker-javascript/ip/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/animal"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/animal --save-dev
```

yarn
```
yarn add @fakerjs/animal -D
```

## Usage

```js
import animal from '@fakerjs/animal';

animal();
//=> Snow Leopard

animal({type: 'zoo'});
//=> Snow Leopard

animal({type: 'zoo', locale: 'en_US'});
//=> Snow Leopard

// Allowed type: ocean, desert, grassland, forest, farm, pet, zoo
// Allowed locale: en_US
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/animal/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
