export default function string(options) {
    options = options || {};
    let length = options.length === undefined ? 64 : options.length;
    const keyspace = options.keyspace || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const pieces = [];
    if (length < 0) {
        length = 1;
    }

    for (let i = 0; i < length; i++) {
        pieces.push(keyspace.charAt(Math.floor(Math.random() * keyspace.length)));
    }

    return pieces.join('');
}
