const word = document.getElementById('word');
const finalMsg = document.getElementById('final-msg');
const popup = document.getElementById('pop-container');
const wrong = document.querySelector('#wrong-letters span');
const man = document.querySelectorAll('.figure-container .figure-part');
const notification = document.getElementById('notification-container');
const playBtn = document.getElementById('play-button');

const wordsCatalog = ['program', 'html']
let selectedWord = wordsCatalog[Math.floor(Math.random() * wordsCatalog.length) ]
const correctLetters = [];
const wrongLetters = [];
const displayWords = () => {
    const letters = selectedWord
    .split('')
    .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
    .join('');
    word.innerHTML = letters;

    const innerWord = word.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMsg.innerText = 'Congrats! You win!';
        popup.style.display = 'flex';
    }
}

const displayWrong = () => {
    wrong.innerText = wrongLetters.join(',');
}

const displayMan = () => {
    if (wrongLetters.length > 0 && wrongLetters.length <= man.length) {
        wrongLetters.forEach((letter, index) => man[index].style.display = 'block')
    }

    if (wrongLetters.length === man.length) {
        finalMsg.innerText = 'Game over!';
        popup.style.display = 'flex';        
    }
}
const showNotification = () => {
    notification.classList.toggle('show');
    setTimeout(() => notification.classList.toggle('show'), 2000);
}
document.addEventListener('keypress', (event) => {
    if (!event.key.match(/^\w{1}$/g)) return;
    if (selectedWord.includes(event.key)) {
        correctLetters.push(event.key);
        displayWords();
        return;
    }

    if (!wrongLetters.includes(event.key)) {
        wrongLetters.push(event.key);
    } else {
        showNotification();
    }
    displayWrong();
    displayMan();
} )
const resetGame = () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = wordsCatalog[Math.floor(Math.random() * wordsCatalog.length) ]
    displayWords();
    displayWrong();
    displayMan();
    man.forEach(item => item.style.display = 'none')
    popup.style.display = 'none';
}
playBtn.addEventListener('click', () => {
    resetGame();
})

displayWords();