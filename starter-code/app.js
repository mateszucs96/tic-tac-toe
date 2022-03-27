const gridContainer = document.querySelector('.grid-container');

let grid;
let primaryMark;
let secondaryMark;
let player1;
let player2;
let players;
let gameArr = [0, 0, 0, 0, 0, 0, 0, 0, 0]

class Player {
    constructor(mark, canMove) {
        this.mark = mark;
        this.canMove = canMove
        grid.forEach(el => el.addEventListener('click', this.placeMarks))
    }
    placeMarks(e) {

        if (e.target.children.length === 0 && !newGame.checkForWin()) {


            const playerMark = document.createElement('img');
            playerMark.classList.add('marks');
            playerMark.classList.add('player-mark');
            players.forEach(player => {
                if (player.canMove) {
                    const idx = +e.target.dataset.index
                    playerMark.src = player.mark
                    e.target.appendChild(playerMark)
                    gameArr[idx] = player.mark === './assets/icon-x.svg' ? 'x' : 'o';
                    console.log(gameArr)
                }
            })

            console.log(gameArr)
            newGame.handleTurns();
            newGame.checkForWin();
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

                primaryMark = el.children[0].getAttribute('src')

            } else {
                secondaryMark = el.children[0].getAttribute('src');

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
            const singleGrid = document.querySelector('.grid')
            singleGrid.dataset.index = i;
        }
        grid = document.querySelectorAll('.grid')
    }
    init() {
        this.loadBoard();
        players = [player1 = new Player(primaryMark, primaryMark === './assets/icon-x.svg' ? true : false), player2 = new Player(secondaryMark, secondaryMark === './assets/icon-x.svg' ? true : false)]

    }

    handleTurns() {
        players.forEach(player => player.canMove ? player.canMove = false : player.canMove = true)

    };
    loop() {
        //loop horizontal       
        for (let i = 0; i < gameArr.length; i += 3) {
            let arr = []

            for (let k = i; k < i + 3; k++) {
                arr.push(gameArr[k])
                console.log(arr)
            }
            if (arr.every(el => el === 'x')) {
                console.log(`x won`);
                return 'x won'
            }
            if (arr.every(el => el === 'o')) {
                console.log(`o won`);
                return 'o won'
            }
        }
        //loop vertical        
        for (let i = 0; i < 3; i++) {
            let arr = []

            for (let k = i; k < i + 6 + 1; k += 3) {
                arr.push(gameArr[k])
                console.log(arr)
            }
            if (arr.every(el => el === 'x')) {
                console.log(`x won`);
                return 'x won'
            }
            if (arr.every(el => el === 'o')) {
                console.log(`o won`);
                return 'o won'
            }
        }
        //loop diagonal(cross to left)
        let arrLeft = []
        for (let i = 0; i < gameArr.length + 1; i += 4) {

            arrLeft.push(gameArr[i])
            console.log(arrLeft)
        }
        if (arrLeft.every(el => el === 'x')) {
            console.log(`x won`);
            return 'x won'
        }
        if (arrLeft.every(el => el === 'o')) {
            console.log(`o won`);
            return 'o won'
        }
        //loop diagonal(cross to right)
        let arrRight = []
        for (let i = 2; i < 7; i += 2) {

            arrRight.push(gameArr[i])
            console.log(arrRight)
        }
        if (arrRight.every(el => el === 'x')) {
            console.log(`x won`);
            return 'x won'
        }
        if (arrRight.every(el => el === 'o')) {
            console.log(`o won`);
            return 'o won'
        }
    }

    checkForWin() {
        return this.loop();
    }
}

const newGame = new Game();


