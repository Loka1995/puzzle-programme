const createPuzzle = (puzzlePieces, puzzleSize) => {
    for (let i = 1; i <= puzzlePieces; i++) {
        const template = document.createElement('template');
        template.innerHTML =
            `
                <div class="grid-item dropzone" id="${i}div" attachedImg="${i}img">
                    <img
                        src="images/${puzzleSize}/image${i}.png"
                        alt="${i}st piece"
                        id="${i}img" />
                </div>
            `;

        const templateContent = template.content;
        const container = document.getElementById('grid-container');
        container.appendChild(templateContent);
    }
}

createPuzzle(9,'3x3');


