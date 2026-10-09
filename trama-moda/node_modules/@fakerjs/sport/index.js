import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

class Sport {
    _ancientOlympics = {};
    _unusual = {};
    _summerOlympics = {};
    _summerParalympics = {};
    _winterOlympics = {};
    _winterParalympics = {};
    _defaultLocale = 'en_US';
    _options = {};

    constructor(options) {
        this._options = options || {};
        const ancientOlympicsFilePath = `./locales/${this._options.locale || this._defaultLocale}/ancient_olympics.json`;
        const unusualFilePath = `./locales/${this._options.locale || this._defaultLocale}/unusual.json`;
        const summerOlympicsFilePath = `./locales/${this._options.locale || this._defaultLocale}/summer_olympics.json`;
        const summerParalympicsFilePath = `./locales/${this._options.locale || this._defaultLocale}/summer_paralympics.json`;
        const winterOlympicsFilePath = `./locales/${this._options.locale || this._defaultLocale}/winter_olympics.json`;
        const winterParalympicsFilePath = `./locales/${this._options.locale || this._defaultLocale}/winter_paralympics.json`;
        this._ancientOlympics = fs.existsSync(path.resolve(ancientOlympicsFilePath)) ? loadJsonFileSync(ancientOlympicsFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/sport/', ancientOlympicsFilePath));
        this._unusual = fs.existsSync(path.resolve(unusualFilePath)) ? loadJsonFileSync(unusualFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/sport/', unusualFilePath));
        this._summerOlympics = fs.existsSync(path.resolve(summerOlympicsFilePath)) ? loadJsonFileSync(summerOlympicsFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/sport/', summerOlympicsFilePath));
        this._summerParalympics = fs.existsSync(path.resolve(summerParalympicsFilePath)) ? loadJsonFileSync(summerParalympicsFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/sport/', summerParalympicsFilePath));
        this._winterOlympics = fs.existsSync(path.resolve(winterOlympicsFilePath)) ? loadJsonFileSync(winterOlympicsFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/sport/', winterOlympicsFilePath));
        this._winterParalympics = fs.existsSync(path.resolve(winterParalympicsFilePath)) ? loadJsonFileSync(winterParalympicsFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/sport/', winterParalympicsFilePath));
    }

    _selectRandom(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    ancientOlympics() {
        return this._selectRandom(this._ancientOlympics);
    }

    unusual() {
        return this._selectRandom(this._unusual);
    }

    summerOlympics() {
        return this._selectRandom(this._summerOlympics);
    }

    summerParalympics() {
        return this._selectRandom(this._summerParalympics);
    }

    winterOlympics() {
        return this._selectRandom(this._winterOlympics);
    }

    winterParalympics() {
        return this._selectRandom(this._winterParalympics);
    }
}

export default function sport(options) {
    return new Sport(options);
}
