const startGameBtn = document.getElementById('startBtn');
const quitGameBtn = document.getElementById('quitBtn');
const movesCount = document.getElementById('movesCount');
const wrongCount = document.getElementById('wrongCount');
const correctCount = document.getElementById('correctCount');
const finalScore = document.getElementById('finalScore');
const header = document.getElementById('app-header').children[0];
const cards = document.getElementsByTagName('img');
const container = document.getElementById('grid-container');
const puzzleChoices = document.getElementsByClassName('puzzle-image__container');
const puzzleSizeButtons = document.getElementsByClassName('size-btn');
const closeBtn = document.getElementById('close-btn');
const backBtn = document.getElementById('back-btn');
const homeView = document.getElementById('puzzle-selection');
const puzzleSizeSelectView = document.getElementById('puzzle-size__buttons');
const gamePageView = document.getElementsByClassName('puzzle-game__container')[0];

let puzzlePieces = 0;
let dragCard = '';
let exchangedCard = '';
let mCount = 0;
let wCount = 0;
let cCount = 0;
let selectedPuzzle = '';
let selectedPuzzleSize = '';


window.addEventListener("load", () => viewHome())

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

const addDragEventListeners = () => {
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
            header.textContent = "Puzzle Complete!!!";
            for (let card of cards) {
                card.style.border = "none";
                card.setAttribute("draggable", false);
                startGameBtn.textContent = "Start Again";
                finalScore.innerHTML = `Final Score: <strong id="score">${((cCount / mCount) * 100).toFixed(2)}%</strong>`;
                finalScore.style.visibility = 'visible';
                header.textContent = "Congratulations!!! Puzzle Complete!!!";
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

const createPuzzle = (puzzleType, puzzleSize, fileType) => {
    if (puzzleSize === '3x3') {
        puzzlePieces = 9;
        container.classList.add('threeXthree');
    }
    else if (puzzleSize === '4x4') {
        puzzlePieces = 16;
        container.classList.add('fourXfour');
    }
    else {
        console.log("debug purpose: wrong puzzle size entered");
    }

    for (let i = 1; i <= puzzlePieces; i++) {
        const template = document.createElement('template');
        template.innerHTML =
            `
                <div class="grid-item dropzone" id="${i}div" attachedImg="${i}img">
                    <img
                        src="images/${puzzleType}/${puzzleSize}/image${i}.${fileType}"
                        alt="Piece: ${i}"
                        id="${i}img" />
                </div>
            `;

        const templateContent = template.content;
        container.appendChild(templateContent);
    }
}

// remove puzzle pieces before next puzzle
const clearPuzzle = () => {
    for (let i = container.children.length - 1; i >= 0; i--) {
        container.children[i].remove();
    }
}

// view the select puzzle 
const viewHome = () => {
    homeView.style.display = 'flex';
    puzzleSizeSelectView.style.display = 'none';
    gamePageView.style.display = 'none';
    closeBtn.style.visibility = 'visible';
    header.textContent = 'Select a Puzzle'
    selectedPuzzle = '';
    selectedPuzzleSize = '';

    for (let puzzleChoice of puzzleChoices) {
        puzzleChoice.addEventListener('click', (e) => {
            selectedPuzzle = e.target.getAttribute('puzzle');
            viewPuzzleSize();
        })
    }

    closeBtn.addEventListener('click', () => window.close());
}

const viewPuzzleSize = () => {
    homeView.style.display = 'none';
    puzzleSizeSelectView.style.display = 'flex';
    gamePageView.style.display = 'none';
    header.textContent = "Select Puzzle Size";
    closeBtn.style.visibility = 'hidden';


    for (let puzzleSizeButton of puzzleSizeButtons) {
        puzzleSizeButton.addEventListener('click', (e) => {
            selectedPuzzleSize = e.target.getAttribute('puzzleSize');
            viewGame();
        })
    }

    backBtn.addEventListener('click', () => viewHome());
}

const viewGame = () => {
    homeView.style.display = 'none';
    puzzleSizeSelectView.style.display = 'none';
    gamePageView.style.display = 'flex';
    container.style.display = 'none';
    header.textContent = "Test your puzzle skills here!!!";
    document.getElementById('move-count').style.display = 'none';
    closeBtn.style.visibility = 'hidden';

    startGameBtn.addEventListener("click", () => {
        container.style.display = 'grid';
        document.getElementById('move-count').style.display = 'block';

        if (container.children.length > 0) clearPuzzle();
        finalScore.innerHTML = `Final Score: <strong id="score">0%</strong>`
        finalScore.style.visibility = 'hidden';
        createPuzzle(selectedPuzzle, selectedPuzzleSize, selectedPuzzle === 'puzzle1' ? 'png': 'jpg');
        shuffle(puzzlePieces);
        addDragEventListeners();

        for (let card of cards) {
            card.style.border = "1px solid white";
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
        header.textContent = "Complete the Puzzle!!!";
        startGameBtn.textContent = "Reshuffle";
    })

    quitGameBtn.addEventListener("click", () => {
        startGameBtn.textContent = "Start Puzzle";
        if (container.classList.contains('threeXthree')) container.classList.remove('threeXthree');
        if (container.classList.contains('fourXfour')) container.classList.remove('fourXfour');
        viewHome();
    })
}
