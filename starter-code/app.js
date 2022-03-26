console.log(document.querySelectorAll('.player-container'))
const gridContainer = document.querySelector('.grid-container');

let grid;
let primaryMark;
let secondaryMark;
let player1;
let player2;
let players;


class Player {
    constructor(mark, canMove) {
        this.mark = mark;
        this.canMove = canMove
        grid.forEach(el => el.addEventListener('click', this.placeMarks))
    }
    placeMarks(e) {
        console.log(primaryMark)
        if (e.target.children.length === 0) {
            newGame.handleTurns();
            console.log(e.target.children)
            const playerMark = document.createElement('img');
            playerMark.classList.add('marks');
            playerMark.classList.add('player-mark');
            playerMark.src = primaryMark;
            e.target.appendChild(playerMark);

        }

    }
}



class Game {
    boardCount = 9;
    playerButton = document.querySelector('.player-button');
    figure = document.querySelectorAll('.player-container');
    changePlayer = document.querySelectorAll('.change-player')

    constructor() {

        this.playerButton.addEventListener('click', this.init.bind(this));
        this.figure.forEach(el => el.addEventListener('click', this.chooseFigure.bind(this)))
        this.checkFigure();
    }
    checkFigure() {
        this.figure.forEach(el => {
            if (el.classList.contains('active')) {
                // primaryMark = el.children.getAttribute('src');
                primaryMark = el.children[0].getAttribute('src')
                console.log(primaryMark, 'primary')
            } else {
                secondaryMark = el.children[0].getAttribute('src');
                console.log(secondaryMark, 'secondary')
            }
        })
    }

    chooseFigure(e) {
        if (e.target.className === 'o' || e.target.className === 'x') {
            const parentEl = e.target.parentElement.parentElement.children

            Array.from(parentEl).forEach(el => el.classList.remove('active'))
            e.target.parentElement.classList.add('active');
            primaryMark = e.target.getAttribute("src")
            this.checkFigure()
        }

    }

    clear() {
        const controlPanel = document.querySelector('.control-panel');
        const buttons = document.querySelector('.buttons-container');
        controlPanel.style.display = 'none';
        buttons.style.display = 'none';
    }

    loadBoard() {
        this.clear();
        gridContainer.style.display = 'grid';
        const html = `<div class="grid"></div>`;
        for (let i = 0; i < this.boardCount; i++) {
            gridContainer.insertAdjacentHTML('afterbegin', html)
        }
        grid = document.querySelectorAll('.grid')
    }
    init() {
        players = [player1 = new Player(primaryMark, true), player2 = new Player(secondaryMark, false)]
        this.loadBoard();

        console.log(players)
    }

    // handleTurns() {
    //     const firstToMove = player1.mark === './assets/icon-x.svg' ? player1 : player2;
    //     console.log(player1)
    //     console.log(player2)
    //     players.forEach(player => player.canMove ? player.canMove = false : player.canMove = true)
    //     console.log(player1)
    //     console.log(player2)
    // }
}

const newGame = new Game();


