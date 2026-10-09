export default function age(options) {
    options = options || {};
    let min = 0;
    let max = 100;
    switch (options.type) {
        case 'child':
            min = 0;
            max = 12;
            break;
        case 'teen':
            min = 13;
            max = 19;
            break;
        case 'adult':
            min = 18;
            max = 65;
            break;
        case 'senior':
            min = 65;
            max = 100;
            break;
        case 'all':
            min = 0;
            max = 100;
            break;
        default:
            min = 0;
            max = 100;
            break;
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
