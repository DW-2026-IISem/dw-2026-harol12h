import word from '@fakerjs/word';
import domain from '@fakerjs/domain';

export default function email(options) {
    options = options || {};
    const d = options.domain === undefined ? domain({length: Math.floor(Math.random() * 10) + 5}) : options.domain;
    return `${word({length: Math.floor(Math.random() * 10) + 5})}@${d}`;
}
