import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

export default function gender(options) {
    options = options || {};
    const filePath = `./locales/${options.locale || 'en_US'}/gender.json`;
    const genders = fs.existsSync(path.resolve(filePath)) ? loadJsonFileSync(filePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/gender/', filePath));
    const gendersWithExtra = [...genders, ...options.extra || []];
    const randomGender = gendersWithExtra[Math.floor(Math.random() * gendersWithExtra.length)];
    return randomGender;
}
