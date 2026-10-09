import sentence from '@fakerjs/sentence';

export default function paragraph(options) {
    options = options || {};
    let sentences = options.sentences === undefined ? 10 : options.sentences;
    let wordsMin = options.wordsMin === undefined ? 5 : options.wordsMin;
    let wordsMax = options.wordsMax === undefined ? 10 : options.wordsMax;
    let paragraph = '';

    if (sentences <= 0) {
        sentences = 10;
    }

    if (wordsMin <= 0) {
        wordsMin = 5;
    }

    if (wordsMax <= 0) {
        wordsMax = 10;
    }

    for (let i = 0; i < sentences; i++) {
        paragraph += sentence({words: Math.floor(Math.random() * (wordsMax - wordsMin + 1)) + wordsMin});
        if (i !== sentences - 1) {
            paragraph += ' ';
        }
    }

    return paragraph;
}
