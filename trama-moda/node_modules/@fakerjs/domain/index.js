import word from '@fakerjs/word';
import tld from '@fakerjs/tld';

export default function domain(options) {
    options = options || {};

    return `${word({length: Math.floor(Math.random() * 10) + 5})}.${options.tld === undefined ? tld() : options.tld}`;
}
