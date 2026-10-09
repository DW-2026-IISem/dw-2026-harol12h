<h1 align="center">Game</h1>
<p align="center">Game package provides functionality to generate a fake game value.</p>

<p align="center">
<a href="https://github.com/faker-javascript/game/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/game.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/game"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/game"> <a href="https://github.com/faker-javascript/game/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/game/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/game"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

npm
```
npm install @fakerjs/game --save-dev
```

yarn
```
yarn add @fakerjs/game -D
```

## Usage

```js
import game from '@fakerjs/game';

game({locale: 'en_US'}).title();
//=> Half-Life 
// Allowed locale: en_US

game().title();
//=> Half-Life 

game().genre();
//=> Action

game().platform();
//=> Windows 
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/game/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
