const cardsArray = [
    { name: 'heroi1', img: 'img/heroi1.jpg' },
    { name: 'heroi1', img: 'img/heroi1.jpg' },
    { name: 'heroi2', img: 'img/heroi2.jpg' },
    { name: 'heroi2', img: 'img/heroi2.jpg' },
    { name: 'heroi3', img: 'img/heroi3.jpg' },
    { name: 'heroi3', img: 'img/heroi3.jpg' },
    { name: 'heroi4', img: 'img/heroi4.jpg' },
    { name: 'heroi4', img: 'img/heroi4.jpg' },
    { name: 'heroi5', img: 'img/heroi5.jpg' },
    { name: 'heroi5', img: 'img/heroi5.jpg' },
    { name: 'heroi6', img: 'img/heroi6.jpg' },
    { name: 'heroi6', img: 'img/heroi6.jpg' },
    { name: 'heroi7', img: 'img/heroi7.jpg' },
    { name: 'heroi7', img: 'img/heroi7.jpg' },
    { name: 'heroi8', img: 'img/heroi8.jpg' },
    { name: 'heroi8', img: 'img/heroi8.jpg' }
];

const gameBoard = document.querySelector('.memory-game');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    const shuffledCards = shuffle([...cardsArray]);

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;

        cardElement.innerHTML = `
            <div class="front-face"></div>
            <div class="back-face">
                <img src="${card.img}" alt="${card.name}">
            </div>
        `;

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createCards();