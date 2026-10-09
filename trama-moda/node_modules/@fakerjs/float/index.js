/* eslint no-mixed-operators: ["error", {"allowSamePrecedence": false}] */
export default function float(options) {
    options = options || {};
    const fixed = 10 ** options.fixed === undefined ? 4 : options.fixed;
    const max = (options.max === undefined) ? Number.MAX_SAFE_INTEGER / fixed : options.max;
    const min = (options.min === undefined) ? Number.MIN_SAFE_INTEGER / fixed : options.min;
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Expected all arguments to be numbers.');
    }

    if (min > max) {
        throw new TypeError('Min cannot be greater than Max.');
    }

    const result = Math.random() * ((max - min) + min);
    return Number(Number(Number.parseFloat(result.toString())).toFixed(4));
}
