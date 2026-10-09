import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

export default function browser() {
    const filePath = `./browsers.json`;
    let browsers = [];
    browsers = fs.existsSync(path.resolve(filePath)) ? loadJsonFileSync(filePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/browser/', filePath));
    return browsers[Math.floor(Math.random() * browsers.length)];
}
