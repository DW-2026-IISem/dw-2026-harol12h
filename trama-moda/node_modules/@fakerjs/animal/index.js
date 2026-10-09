import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

export default function animal(options) {
    options = options || {};
    const filePath = `./locales/${options.locale || 'en_US'}/${options.type || 'zoo'}.json`;
    const animals = fs.existsSync(path.resolve(filePath)) ? loadJsonFileSync(filePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/animal/', filePath));
    return animals[Math.floor(Math.random() * animals.length)];
}
