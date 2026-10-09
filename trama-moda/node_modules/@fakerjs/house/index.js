import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

class House {
    _furnitures = {};
    _rooms = {};
    _defaultLocale = 'en_US';
    _options = {};

    constructor(options) {
        this._options = options || {};
        const furnitureFilePath = `./locales/${this._options.locale || this._defaultLocale}/furniture.json`;
        const roomFilePath = `./locales/${this._options.locale || this._defaultLocale}/room.json`;
        this._furnitures = fs.existsSync(path.resolve(furnitureFilePath)) ? loadJsonFileSync(furnitureFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/house/', furnitureFilePath));
        this._rooms = fs.existsSync(path.resolve(roomFilePath)) ? loadJsonFileSync(roomFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/house/', roomFilePath));
    }

    _selectRandom(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    furniture() {
        return this._selectRandom(this._furnitures);
    }

    room() {
        return this._selectRandom(this._rooms);
    }
}

export default function house(options) {
    return new House(options);
}
