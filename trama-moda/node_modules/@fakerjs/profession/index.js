import path from 'node:path';
import fs from 'node:fs';
import {loadJsonFileSync} from 'load-json-file';

export default function profession(options) {
    options = options || {};
    const locale = options.locale || 'en_US';
    const ranksFilePath = `./locales/${locale}/ranks.json`;
    const ranks = fs.existsSync(path.resolve(ranksFilePath)) ? loadJsonFileSync(ranksFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/profession/', ranksFilePath));
    const professionsFilePath = `./locales/${locale}/professions.json`;
    const professions = fs.existsSync(path.resolve(professionsFilePath)) ? loadJsonFileSync(professionsFilePath) : loadJsonFileSync(path.resolve('node_modules/@fakerjs/profession/', professionsFilePath));
    const randomProfession = professions[Math.floor(Math.random() * professions.length)];

    if (options.rank) {
        return `${ranks[Math.floor(Math.random() * ranks.length)]} ${randomProfession}`;
    }

    return randomProfession;
}
