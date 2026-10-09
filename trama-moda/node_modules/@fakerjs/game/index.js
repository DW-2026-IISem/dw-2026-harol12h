import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

class Game {
    _titles = {};
    _genres = {};
    _platforms = {};
    _defaultLocale = 'en_US';
    _options = {};

    constructor(options) {
        this._options = options || {};
        const titleFilePath = `./locales/${this._options.locale || this._defaultLocale}/title.json`;
        const platformFilePath = `./locales/${this._options.locale || this._defaultLocale}/platform.json`;
        const genreFilePath = `./locales/${this._options.locale || this._defaultLocale}/genre.json`;
        this._titles = fs.existsSync(path.resolve(titleFilePath)) ? loadJsonFileSync(titleFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/game/', titleFilePath));
        this._platforms = fs.existsSync(path.resolve(platformFilePath)) ? loadJsonFileSync(platformFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/game/', platformFilePath));
        this._genres = fs.existsSync(path.resolve(genreFilePath)) ? loadJsonFileSync(genreFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/game/', genreFilePath));
    }

    _selectRandom(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    title() {
        return this._selectRandom(this._titles);
    }

    genre() {
        return this._selectRandom(this._genres);
    }

    platform() {
        return this._selectRandom(this._platforms);
    }
}

export default function game(options) {
    return new Game(options);
}
