import path from 'node:path';
import {loadJsonFileSync} from 'load-json-file';

export default function letter(options) {
    options = options || {};
    const locale = options.locale || 'en_US';
    const filePath = `./locales/${locale}/letters.json`;
    let letters = [];

    try {
        letters = loadJsonFileSync(filePath);
    } catch {
        letters = loadJsonFileSync(path.resolve('node_modules/@fakerjs/letter/', filePath));
    }

    const letter = letters[0].charAt(Math.floor(Math.random() * letters[0].length));
    return (options.casing === 'upper' ? letter.toUpperCase() : letter);
}
