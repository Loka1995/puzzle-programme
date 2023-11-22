const startGameBtn = document.getElementById('startBtn');
const quitGameBtn = document.getElementById('quitBtn');
const movesCount = document.getElementById('movesCount');
const wrongCount = document.getElementById('wrongCount');
const correctCount = document.getElementById('correctCount');
const finalScore = document.getElementById('finalScore');
const gameStatus = document.getElementById('game-status');
const cards = document.getElementsByTagName('img');

let dragCard = '';
let exchangedCard = '';
let mCount = 0;
let wCount = 0;
let cCount = 0;

startGameBtn.addEventListener("click", () => {
    shuffle(9);
    addEventListeners();
    for (let card of cards) {
        card.style.border = "1px solid #FFCE0F";
        card.setAttribute('draggable', true);
    }
    dragCard = '';
    exchangedCard = '';
    mCount = 0;
    wCount = 0;
    cCount = 0;
    movesCount.innerHTML = `Total Moves: <strong id="moves-count">0</strong>`;
    correctCount.innerHTML = `Wrong Moves: <strong id="correct-counts">0</strong>`;
    wrongCount.innerHTML = `Correct Moves: <strong id="wrong-counts">0</strong>`;
    gameStatus.textContent = "Complete the Puzzle!!!";
    startGameBtn.textContent = "Reshuffle";
})

quitGameBtn.addEventListener("click", () => {
    window.close();
})

const shuffle = (numberOfCards) => {
    for (let card of cards) {
        let randomPosition = Math.floor(Math.random() * numberOfCards) + 1;
        const secondCard = document.getElementById(`${randomPosition}img`);
        const parentOfFirstCard = card.parentElement;
        const parentOfSecondCard = secondCard.parentElement;
        parentOfSecondCard.appendChild(card);
        parentOfFirstCard.appendChild(secondCard);
    }
}

const addEventListeners = () => {
    for (let card of cards) {
        card.addEventListener("drag", dragListener);
        card.addEventListener("drop", dropListener);
        card.addEventListener("dragover", dragoverListener);
    }
}

const dragListener = (e) => {
    dragCard = e.target;
};

const dropListener = (e) => {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('dropzone')) {
        exchangedCard = e.target;
        const dragCardParent = dragCard.parentElement;
        const exchangedCardParent = exchangedCard.parentElement;

        if (dragCardParent !== exchangedCardParent) {
            movesCount.innerHTML = `Total Moves: <strong id="moves-count">${++mCount}</strong>`;

            if ((dragCard.getAttribute("id") === exchangedCardParent.getAttribute("attachedImg"))
                || (exchangedCard.getAttribute("id") === dragCardParent.getAttribute("attachedImg"))) {
                dragCardParent.appendChild(exchangedCard);
                exchangedCardParent.appendChild(dragCard);
                correctCount.innerHTML = `Correct Moves: <strong id="correct-counts">${++cCount}</strong>`;
            } else {
                wrongCount.innerHTML = `Wrong Moves: <strong id="wrong-counts">${++wCount}</strong>`;
            }
        }

        const gameComplete = checkComplete();
        if (gameComplete) {
            gameStatus.textContent = "Puzzle Complete!!!";
            for (let card of cards) {
                card.style.border = "none";
                card.setAttribute("draggable", false);
                startGameBtn.textContent = "Start Again";
                finalScore.innerHTML = `Final Score: <strong id="score">${((cCount / mCount) * 100).toFixed(2)}%</strong>`;
                finalScore.style.visibility = 'visible';
            }
        }
    };
};

const dragoverListener = (e) => {
    e.preventDefault();
};

const checkComplete = () => {
    for (let card of cards) {
        if (card.getAttribute("id") !== card.parentElement.getAttribute("attachedImg")) return false;
    }
    return true;
}