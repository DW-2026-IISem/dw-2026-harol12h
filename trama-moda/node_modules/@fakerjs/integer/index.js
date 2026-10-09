export default function integer(options) {
    options = options || {};
    let max = options.max === undefined ? Number.MAX_SAFE_INTEGER : options.max;
    let min = options.min === undefined ? Number.MIN_SAFE_INTEGER : options.min;
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Expected all arguments to be numbers.');
    }

    if (min > max) {
        throw new TypeError('Min cannot be greater than Max.');
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
