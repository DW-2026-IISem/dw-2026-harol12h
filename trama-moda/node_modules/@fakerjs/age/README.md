<h1 align="center">Age</h1>
<p align="center">
Age package provides functionality to generate a fake age value.
</p>

<p align="center">
<a href="https://github.com/faker-javascript/age/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/age.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/age"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/age"> <a href="https://github.com/faker-javascript/age/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/age/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/age"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

```
$ npm install --save @fakerjs/age
```

## Usage

```js
import age from '@fakerjs/age';

age();
//=> 42

age({type: 'child'});
//=> 10

// Allowed type: child, teen, adult, senior
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/age/blob/master/LICENSE.txt)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
