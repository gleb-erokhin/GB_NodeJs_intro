function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isVowel(letter) {
    return ["a", "e", "i", "o", "u"].includes(letter);
}

function generateRandomName() {
    const vowels = ["a", "e", "i", "o", "u"];
    const consonants = "bcdfghjklmnpqrstvwxyz";

    const length = getRandomInt(3, 12);

    let name = "";

    name += String.fromCharCode(getRandomInt(65, 90));

    for (let i = 1; i < length; i++) {
        if (i % 2 === 0) {
            let consonant = consonants.charAt(
                Math.floor(Math.random() * consonants.length)
            );
            while (
                i > 1 &&
                name.charAt(i - 1) === consonant &&
                name.charAt(i - 2) === consonant
            ) {
                consonant = consonants.charAt(
                    Math.floor(Math.random() * consonants.length)
                );
            }
            name += consonant;
        } else {
            let vowel = vowels[Math.floor(Math.random() * vowels.length)];
            while (
                i > 1 &&
                name.charAt(i - 1) === vowel &&
                name.charAt(i - 2) === vowel
            ) {
                vowel = vowels[Math.floor(Math.random() * vowels.length)];
            }
            name += vowel;
        }
    }

    return name;
}

function generateRandomMail() {
    return generateRandomName().toLowerCase() + "@pmail.phly";
}

function generateRandomAddress() {
    return `${generateRandomName()} Rebublic, ${generateRandomName()} City, ${getRandomInt(
        1,
        300
    )} ${generateRandomName()} Street, Apt ${getRandomInt(1, 700)}`;
}

module.exports = { generateRandomName, generateRandomMail,  generateRandomAddress};
