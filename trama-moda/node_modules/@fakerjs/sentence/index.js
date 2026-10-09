import word from '@fakerjs/word';

export default function sentence(options) {
    options = options || {};
    let words = options.words === undefined ? 5 : options.words;
    let sentence = '';

    if (words < 0) {
        words = 5;
    }

    for (let i = 0; i < words; i++) {
        sentence += word({length: Math.floor(2 + (Math.random() * 9))});
        if (i !== words - 1) {
            sentence += ' ';
        }
    }

    return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`;
}
