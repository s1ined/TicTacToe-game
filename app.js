'use strict'

//window.requestAnimationFrame(gameLoop)

let playerMove = true
let pl1 = document.querySelector('.player1')
let pl2 = document.querySelector('.player2')

// Рисуем доску
//--------------------------------------------------------------------
let div0 = document.createElement('div')
let div1 = document.createElement('div')
let div2 = document.createElement('div')
let div3 = document.createElement('div')
let div4 = document.createElement('div')
let div5 = document.createElement('div')
let div6 = document.createElement('div')
let div7 = document.createElement('div')
let div8 = document.createElement('div')
let divContainer = document.querySelector('.board')

let board = [
    [div0, div1, div2],
    [div3, div4, div5],
    [div6, div7, div8]
]
let checkTileList = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

for (let i = 0; i < board.length; ++i) {
    for (let j = 0; j < board[i].length; ++j) {
        board[i][j].style.border = '1px solid gray'
        board[i][j].style.width = '150px'
        board[i][j].style.height = '150px'
        board[i][j].className = 'div' + i
        board[i][j].addEventListener('click', (event) => {
            //console.log(`Div ${board[i][j].className} clicked!`)
            markTiles(i, j)
            checkTiles()
        })
        divContainer.appendChild(board[i][j])
    }
}

function markTiles(i, j) {
    if (playerMove) {
        board[i][j].style.backgroundColor = 'rgb(230, 103, 107)'
        board[i][j].style.transition = 'background-color 500ms'

        pl1.style.backgroundColor = 'rgb(5, 146, 0)'
        pl2.style.backgroundColor = ''
        playerMove = false
    } else {
        board[i][j].style.backgroundColor = 'lightgray'
        board[i][j].style.transition = 'background-color 500ms'

        pl1.style.backgroundColor = ''
        pl2.style.backgroundColor = 'rgb(5, 146, 0)'
        playerMove = true
    }
}

function checkTiles() {
    checkHorizontalTiles()
    checkVerticalTiles()
    checkLeftDiagonal()
    checkRightDiagonal()
}

function checkHorizontalTiles() {
    let redTileCount = 0
    let grayTileCount = 0

    // Проверяем горизонтали
    for (let i = 0; i < board.length; ++i) {
        redTileCount = 0
        grayTileCount = 0
        for (let j = 0; j < board[i].length; ++j) {
            if (board[i][j].style.backgroundColor == 'rgb(230, 103, 107)') {
                redTileCount++
                checkTileList[i][j] = 1
                if (redTileCount == 3) {
                    alert('Player 1 wins!')
                    resetGame()
                }
            } else if (board[i][j].style.backgroundColor == 'lightgray') {
                grayTileCount++
                checkTileList[i][j] = 2
                if (grayTileCount == 3) {
                    alert('Player 2 wins!')
                    resetGame()
                }
            }
        }
    }
}

function checkVerticalTiles() {
    let redTileCount = 0
    let grayTileCount = 0

    // Проверяем вертикали
    for (let j = 0; j < board.length; ++j) {
        redTileCount = 0
        grayTileCount = 0
        for (let i = 0; i < board[j].length; ++i) {
            if (board[i][j].style.backgroundColor == 'rgb(230, 103, 107)') {
                redTileCount++
                if (redTileCount == 3) {
                    alert('Player 1 wins!')
                    resetGame()
                }
            } else if (board[i][j].style.backgroundColor == 'lightgray') {
                grayTileCount++
                if (grayTileCount == 3) {
                    alert('Player 2 wins!')
                    resetGame()
                }
            }
        }
    }
}

function checkLeftDiagonal() {
    let redTileCount = 0
    let grayTileCount = 0

    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            if (i == j && board[i][j].style.backgroundColor == 'rgb(230, 103, 107)') {
                redTileCount++
                if (redTileCount == 3) {
                    alert('Player 1 wins!')
                    redTileCount = 0
                    resetGame()
                }
            } else if (i == j && board[i][j].style.backgroundColor == 'lightgray') {
                grayTileCount++
                if (grayTileCount == 3) {
                    alert('Player 2 wins!')
                    grayTileCount = 0
                    resetGame()
                }
            }
        }
    }
}

function checkRightDiagonal() {
    let redTileCount = 0
    let grayTileCount = 0

    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            if ((i + j) < board.length && board[i][j].style.backgroundColor == 'rgb(230, 103, 107)') {
                redTileCount++
                if (redTileCount == 3) {
                    alert('Player 1 wins!')
                    redTileCount = 0
                    resetGame()
                }
            } else if ((i + j) < board.length && board[i][j].style.backgroundColor == 'lightgray') {
                grayTileCount++
                if (grayTileCount == 3) {
                    alert('Player 2 wins!')
                    grayTileCount = 0
                    resetGame()
                }
            }
        }
    }
}

function resetGame() {
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            board[i][j].style.backgroundColor = ''
        }
    }
    pl1.style.backgroundColor = 'rgb(5, 146, 0)'
    console.log(checkTileList)
    checkTileList = [...Array(3)].map(x => Array(3).fill(0))
    console.log(checkTileList)
    playerMove = true
}
//--------------------------------------------------------------------

// Игровой цикл
// function gameLoop() {
//     gameLogic()

//     window.requestAnimationFrame(gameLoop)
// }

// ===========================================================================
