class Game {
    boardCount = 9;
    playerButton = document.querySelector('.player-button');
    figure = document.querySelector('.change-player');
    gridContainer = document.querySelector('.grid-container');
    constructor() {
        this.playerButton.addEventListener('click', this.init.bind(this));
        this.figure.addEventListener('click', this.chooseFigure);
    }
    chooseFigure(e) {
        if (e.target.className === 'o' || e.target.className === 'x') {
            console.log('true')
        }

    }

    clear() {
        const controlPanel = document.querySelector('.control-panel');
        const buttons = document.querySelector('.buttons-container');
        controlPanel.style.display = 'none';
        buttons.style.display = 'none';
    }

    _loadBoard() {
        this.clear();

        this.gridContainer.style.display = 'grid';
        const html = `<div class="grid"></div>`;
        for (let i = 0; i < this.boardCount; i++) {
            this.gridContainer.insertAdjacentHTML('afterbegin', html)
        }
    }
    init() {
        this._loadBoard()
    }
}

const newGame = new Game();


