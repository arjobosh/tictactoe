// by joshua arber

const Player = (name='', symbol='', player=0) => {
    let _score = 0;

    const getName = () => name;
    const getSymbol = () => { 
        return (symbol.length == 1) ? symbol : null 
    }
    const getPlayer = () => player;
    const getScore = () => _score;

    const markCell = (cell=Cell) => {
        cell.setSymbol(symbol);
    }
    const incrementScore = () => {
        _score++;
        return _score;
    }

    return { 
        getName, getSymbol, getPlayer, getScore, 
        markCell, incrementScore 
    };
}

const Cell = (state=true, location=[]) => {
    let profile = { state, location }

    const changeState = () => profile.state = !profile.state;
    const setSymbol = (symbol='') => profile.symbol = symbol;
    const isEmpty = () => profile.state;
    const getLocation = () => profile.location;
    const getSymbol = () => profile.symbol;
    const updateCell = (symbol='') => {
        changeState();
        setSymbol(symbol);
    }

    return { updateCell, isEmpty, getLocation, getSymbol };
};

const gameBoard = (() => {
    const board = [];
    
    // initial board setup
    const initBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                board[i][j] = Cell(true, [i, j]);
            }
        }
    }

    const printBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                console.log(`[${i},${j}] = ${board[i][j].getSymbol()}`);
            }
        }
    }

    const boardIsFull = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j].isEmpty())
                    return false;
            }
        }

        return true;
    }

    const checkRowWin = (symbol='', col=0) => {
        for (let i = 0; i < board.length; i++) {
            //console.log(board[row][i].getSymbol() + ' : ' + symbol);
            //console.log(`[${i},${col}] = ${board[i][col].getSymbol()}`);
            if (board[i][col].getSymbol() != symbol) {
                return false;
            }
        }

        return true;        
    }

    const checkColWin = (symbol='', row=0) => {
        for (let i = 0; i < board.length; i++) {
            //console.log(board[i][col].getSymbol() + ' : ' + symbol);
            //console.log(`[${row},${i}] = ${board[row][i].getSymbol()}`);
            if (board[row][i].getSymbol() != symbol) {
                return false;
            }
        }

        return true;   
    }

    const checkDiagWinRight = (symbol='') => {
        for (let i = 0; i < board.length; i++) {
            //console.log(board[i][i].getSymbol() + ' : ' + symbol);
            //console.log(`[${i},${i}] = ${board[i][i].getSymbol()}`);
            if (board[i][i].getSymbol() != symbol) {
                return false;
            }
        }

        return true;
    }

    const checkDiagWinLeft = (symbol='') => {
        for (let i = 0; i < board.length; i++) {
            //console.log(board[i][j].getSymbol() + ' : ' + symbol);
            //console.log(`[${i},${j}] = ${board[i][j].getSymbol()}`);

            if (board[i][board.length-1-i].getSymbol() != symbol) {
                return false;
            }
        }

        return true;
    }

    const checkWin = (symbol='') => {
        for (let i = 0; i < board.length; i++) {
            if (checkRowWin(symbol, i)) return true;
        }

        for (let i = 0; i < board.length; i++) {
            if (checkColWin(symbol, i)) return true;
        }

        if (checkDiagWinLeft(symbol)) return true;

        if (checkDiagWinRight(symbol)) return true;

        return false;
    }

    return { 
        initBoard, printBoard, boardIsFull, checkWin, board 
    };
})();

// module pattern wraps the factory in an IIFE (Immediately Invoked Function Expression)
const displayController = (() => {
    let curPlayer = null;
    const player1 = Player('player one', 'X', 1);
    const player2 = Player('player two', 'O', 2);
    setCurPlayer(player1);
    gameBoard.initBoard();

    const createBoard = () => {
        const displayBoard = document.getElementById('gameboard');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('div');   
                cell.className = 'cell';            
                let cellCoord = `r${i}c${j}`;
                cell.setAttribute('cell-coord', cellCoord);
                cell.addEventListener('click', function() {
                    if (gameBoard.board[i][j].isEmpty()) {
                        gameBoard.board[i][j].updateCell(curPlayer.getSymbol());
                        cell.innerHTML = curPlayer.getSymbol();
                        //gameBoard.printBoard();

                        if (gameBoard.checkWin(curPlayer.getSymbol())) {
                            let winner = `${curPlayer.getName()}`;
                            alert(winner + ' wins!');

                            document.getElementById(`p${curPlayer.getPlayer()}`).innerHTML =
                                curPlayer.getName() + `: ${curPlayer.incrementScore()}`;
                            
                            resetBoard();
                        }
                        else if (gameBoard.boardIsFull()) {
                            alert('game is a draw.');
                            resetBoard();
                        }
                        else {
                            flipPlayerTurn();
                        }
                        
                        
                    }                    
                });
                displayBoard.appendChild(cell);
            }
        }
    }

    function resetBoard() {
        gameBoard.initBoard();
        document.querySelectorAll('.cell').forEach(ele => {
            ele.innerHTML = '';
        });
        setCurPlayer(player1);
    }

    function flipPlayerTurn() {
        if (curPlayer === player1) {
            setCurPlayer(player2);
        }
        else {
            setCurPlayer(player1);
        }
    }

    function getCurPlayer() {
        return curPlayer;
    }

    function setCurPlayer(player=Player) {
        curPlayer = player;
    }

    return {
        createBoard
    };

})(gameBoard).createBoard();
