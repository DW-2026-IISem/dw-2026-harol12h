<h1 align="center">Sport</h1>
<p align="center">Sport package provides functionality to generate a fake sport value.</p>

<p align="center">
<a href="https://github.com/faker-javascript/sport/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/sport.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/sport"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/sport"> <a href="https://github.com/faker-javascript/sport/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/sport/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/sport"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/sport --save-dev
```

yarn
```
yarn add @fakerjs/sport -D
```

## Usage

```js
import sport from '@fakerjs/sport';

sport({locale: 'en_US'}).unusual();
//=> Apple Racing 
// Allowed locale: en_US

sport().unusual();
//=> Apple Racing

sport().ancientOlympics();
//=> Boxing

sport().summerOlympics();
//=> Archery

sport().summerParalympics();
//=> Archery

sport().winterOlympics();
//=> Biathlon

sport().winterParalympics();
//=> Snowboard
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/sport/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
