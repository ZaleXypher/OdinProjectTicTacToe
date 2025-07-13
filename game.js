function gameBoard(){
    let round = 1;
    let box = document.querySelector("#game-board");
    let player = "X"
    let currentGame = [["", "", ""], ["", "", ""], ["", "", ""]]
    let winStatus = 0;

    function winner(player){
        let playerLetter = player;
        let win = function checkWinner(gameBoard){
            let winHor = function checkHorizontal(board){
                let letterCount = 0;
                for(let i = 0; i < board.length; i++){
                    for(let o = 0; o < board.length; o++){
                        if(board[i][o] == playerLetter){
                        letterCount++;
                        }
                    }
                    if(letterCount == board.length){
                        letterCount = 0;
                        return 1;
                    }
                    letterCount = 0;
                }
            }
            let winVer = function checkVertical(board){
                let letterCount = 0;
                for(let i = 0; i < board.length; i++){
                    for(let o = 0; o < board.length; o++){
                        if(board[o][i] == playerLetter){
                        letterCount++;
                        }
                    }
                    if(letterCount == board.length){
                        return 1;
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
                    if(board[i][board.length-i-1] == playerLetter){
                        diagTwo++;
                    }
                }
                if(diagOne == board.length || diagTwo == board.length){
                    diagOne = 0;
                    diagTwo = 0;
                    return 1;
                }
                diagOne = 0;
                diagTwo = 0;
            }
            
            if(winHor(gameBoard) || winVer(gameBoard) || winDia(gameBoard)){
                return 1
            }
        }
        return {win}
    }

    function announce(){
        let announcer = document.querySelector("#announce")

        function announcePlayer(player){
            announcer.textContent = `Player ${player}'s turn`;
        }

        function win(player, board){
            let winChecker = winner(player);
            if(winChecker.win(board)){
                winStatus = 1;
                announcer.textContent = `Player ${player}'s win`;
                setTimeout(resetBoard, 3000)
            }
        }
    
        function tie(round){
            if(round >= 9){
                announcer.textContent = `Players tied`;
                setTimeout(resetBoard, 3000)
            }
        }
        return {announcePlayer, win, tie}
    }

    let announcements = announce();

    function play(box){
        if(box.target.textContent == "" && winStatus == 0){
            box.target.textContent = player;
            box.target.classList.add(player);
            let row = box.target.getAttribute("data-row");
            let column = box.target.getAttribute("data-column");
            currentGame[row][column] = player;

            if(round % 2 == 0){
                announcements.announcePlayer("X");
                announcements.win(player, currentGame);
                player = "X";
            }
            else {
                announcements.announcePlayer("Y");
                announcements.win(player, currentGame);
                player = "Y"; 
            }
            round++;
        }
    }

    function createBoard(){
        for(let i = 0; i < 3; i++){
            for(let o = 0; o < 3; o++){
                let grid = document.createElement("div");
                grid.classList.add("play-box");
                grid.setAttribute("data-row", i);
                grid.setAttribute("data-column", o);
                box.addEventListener("click", play);
                box.appendChild(grid);
            }
        }
        round = 1;
        announcements.announcePlayer("X")
    }

    function resetBoard(){
        currentGame = [["", "", ""], ["", "", ""], ["", "", ""]];
        box.innerHTML = '';
        player = "X";
        round = 0;
        winStatus = 0;
        createBoard();
    }
    
    return {createBoard, resetBoard}
}

let board = gameBoard();

board.createBoard();