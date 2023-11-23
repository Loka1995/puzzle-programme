const container = document.getElementById('grid-container');
const createPuzzle = (puzzleType, puzzleSize, fileType) => {
    let puzzlePieces = 0;

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

createPuzzle('puzzle3','3x3', 'jpg');

// remove puzzle pieces before next puzzle
const clearPuzzle = () => {
    for (let puzzlePiece of container.children) {
        puzzlePiece.remove();
    }
}

