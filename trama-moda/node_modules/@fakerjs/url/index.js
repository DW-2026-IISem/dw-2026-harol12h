import domain from '@fakerjs/domain';

export default function url(options) {
    options = options || {};
    return `${options.protocol || 'http'}://${domain({tld: options.tld || 'com'})}`;
}
