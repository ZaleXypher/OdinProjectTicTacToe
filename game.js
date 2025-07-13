function checkWin(player){
    let playerLetter = player;
    let winHor = function checkHorizontal(board){
        let letterCount = 0;
        for(let i = 0; i < board.length; i++){
            for(let o = 0; o < 3; o++){
                if(board[i][o] == playerLetter){
                letterCount++;
                }
            }
            if(letterCount == 3){
                letterCount = 0;
                return `${player} Win`
            }
            letterCount = 0;
        }
    }
    let winVer = function checkVertical(board){
        let letterCount = 0;
        for(let i = 0; i < board.length; i++){
            for(let o = 0; o < 3; o++){
                if(board[o][i] == playerLetter);
                letterCount++
            }
            if(letterCount == 3){
                return `${player} Win`
            }
            letterCount = 0;
        }
    }

    let winDia = function checkDiagonal(board){
        let diagOne = 0;
        let diagTwo = 0;
        for(let i = 0; i < board.length; i++){
            if(board[i][i] == playerLetter){
                diagOne++;
            }
            if(board[i][2-i] == playerLetter){
                diagTwo++
            }
        }
        if(diagOne == 3 || diagTwo == 3){
            diagOne = 0;
            diagTwo = 0;
            return `${player} Win`
        }
        diagOne = 0;
        diagTwo = 0;
    }

    return {winHor, winVer, winDia}
}

let winX = checkWin('X');
let winY = checkWin('Y')
let gameBoard = [["", "", "X"], ["", "X", ""], ["X", "", ""]]

console.log(winX.winDia(gameBoard))