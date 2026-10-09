import path from 'node:path';
import {loadJsonFileSync} from 'load-json-file';

export default function firstName(options) {
    options = options || {};
    const gender = options.gender === undefined ? 'female' : options.gender;
    const locale = options.locale === undefined ? 'en_US' : options.locale;
    const filePath = `./locales/${locale}/${gender}.json`;
    let firstnames = [];

    try {
        firstnames = loadJsonFileSync(filePath);
    } catch {
        firstnames = loadJsonFileSync(path.resolve('node_modules/@fakerjs/firstname/', filePath));
    }

    return firstnames[Math.floor(Math.random() * firstnames.length)];
}
