<h1 align="center">Url</h1>
<p align="center">Url package provides functionality to generate a fake url value.</p>

<p align="center">
<a href="https://github.com/faker-javascript/url/releases"><img alt="Version" src="https://img.shields.io/github/release/faker-javascript/url.svg?label=version&color=green"></a> <img src="https://img.shields.io/npm/dt/@fakerjs/url"> <img alt="node-current" src="https://img.shields.io/node/v/@fakerjs/url"> <a href="https://github.com/faker-javascript/url/actions/workflows/ci.yml"><img src="https://github.com/faker-javascript/url/actions/workflows/ci.yml/badge.svg"></a> <a href="https://github.com/faker-javascript/url"><img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green" alt="License"></a>
</p>

## Install

```
$ npm install --save @fakerjs/url
```

## Usage

```js
import url from '@fakerjs/url';

url();
//=> http://rad.com

url({protocol: 'https'});
//=> https://rad.com

url({protocol: 'https', tld: 'rad.com'});
//=> https://totally.rad.com
```

## Tests

Run tests

```
npm run test
```

## License
[The MIT License (MIT)](https://github.com/faker-javascript/url/blob/master/LICENSE)
Copyright (c) [Sergey Romanenko](https://github.com/Awilum)
