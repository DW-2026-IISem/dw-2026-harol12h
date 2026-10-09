import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

export default function tld() {
    const filePath = `./tlds.json`;
    let tlds = [];
    tlds = fs.existsSync(path.resolve(filePath)) ? loadJsonFileSync(filePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/tld/', filePath));
    return tlds[Math.floor(Math.random() * tlds.length)].toLowerCase();
}
