import path from 'node:path';
import {loadJsonFileSync} from 'load-json-file';

export default function lastName(options) {
    options = options || {};
    const locale = options.locale === undefined ? 'en_US' : options.locale;
    const filePath = `./locales/${locale}/lastnames.json`;
    let lastnames = [];

    try {
        lastnames = loadJsonFileSync(filePath);
    } catch {
        lastnames = loadJsonFileSync(path.resolve('node_modules/@fakerjs/lastname/', filePath));
    }

    return lastnames[Math.floor(Math.random() * lastnames.length)];
}
