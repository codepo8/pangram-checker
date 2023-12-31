let pangrams= [
    "The quick brown fox jumps over the lazy dog.",
    "Sphinx of black quartz, judge my vow.",
    "Pack my box with five dozen liquor jugs.",
    "Jackdaws love my big sphinx of quartz.",
    "The five boxing wizards jump quickly.",
    "How vexingly quick daft zebras jump!",
    "Bright vixens jump; dozy fowl quack.",
    "The jay, pig, fox, zebra, and my wolves quack!",
    "Sympathizing would fix Quaker objectives.",
    "Fickle jinx bog dwarves spy math quiz.",
    "Big dwarves heckle my top quiz of jinxed vows.",
    "Go, lazy fat vixen; be shrewd, jump quick."
];
const f = document.querySelector('form');
const sentencefield = document.querySelector('#sentence');
const result = document.querySelector('.result');
const demos = document.querySelector('#demos');

const check = sentence => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const chars = sentence.toLowerCase().replace(/[^a-z]/g, '').split(''); 
    const uniqueLetters = new Set(chars);
    if (uniqueLetters.size === 26) {
        let letters = {};
        chars.forEach(char => {
            letters[char] = letters[char] ? letters[char] + 1 : 1;
        });
        let duplicates = [];
        Object.keys(letters).forEach(letter => {
            if (letters[letter] > 1) {
                duplicates.push(`${letters[letter]}×${letter}`);
            }
        });     
        result.textContent = `'This is a pangram. It is ${sentence.length} letters long. Duplicates are: ${duplicates.join(', ')}.`;
        result.classList.add('valid');
    } else {
        let missing = [];
        letters.split('').forEach(letter => {
            if (!uniqueLetters.has(letter)) {
                missing.push(letter);
            }
        })
        result.textContent = 'This is not a pangram. Still missing: ' + missing.join(', ') + '.';
        result.classList.remove('valid');
    }
}
sentencefield.addEventListener ('keyup', (e) => {
    check(sentencefield.value);
})
f.addEventListener('submit', (e) => {
    e.preventDefault();
    check(sentencefield.value);
})
pangrams.forEach(pangram => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = pangram;
    li.appendChild(button);
    demos.appendChild(li);
})
demos.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        sentencefield.value = e.target.textContent;
        check(sentencefield.value);
    }
})
