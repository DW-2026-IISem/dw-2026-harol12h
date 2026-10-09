/* eslint no-negated-condition: "off" */
export default function word(options) {
    options = options || {};
    const consonants = 'bcdfghjklmnprstvwz';
    const vowels = 'aeiou';
    let length = options.length === undefined ? 3 : options.length;
    let chars = '';
    let chr;

    if (length < 0) {
        length = 1;
    }

    for (let i = 0; i < length; i++) {
        if (i === 0) {
            chr = (consonants + vowels).charAt(Math.floor(Math.random() * (consonants + vowels).length));
        } else if (!consonants.includes(chr)) {
            chr = consonants.charAt(Math.floor(Math.random() * consonants.length));
        } else {
            chr = vowels.charAt(Math.floor(Math.random() * vowels.length));
        }

        chars += chr;
    }

    return chars;
}
