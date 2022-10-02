const player = (marker) => {
    getMark = () => marker;
    return {getMark};
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const updateBoard = (index, marker) => {
        board[index] = marker;
    };

    const resetBoard = () => {
        for (i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = "";
        }
    };

    return {board, updateBoard, resetBoard};
})();

const displayController = (() => {
    const message = document.querySelector(".message");
    const fieldEl = document.querySelectorAll(".gameboard-field");
    const restartBtn = document.querySelector(".restart-btn");

    fieldEl.forEach((field) => {
        field.addEventListener("click", () => {
            index = field.dataset.index;
            if (gameBoard.board[index] !== "") return;
            gameController.playRound(index);
            displayController.renderMarker(field, index);
        });
    });

    const displayMsg = (playersMark) => {
        message.textContent = `Player ${playersMark}'s turn`;
    };

    const renderMarker = (field, index) => {
        if (gameBoard.board[index] === "X") {
            field.dataset.state = "PlayerX";
            field.textContent = gameBoard.board[index];

        } else {
            field.dataset.state = "PlayerO";
            field.textContent = gameBoard.board[index];
        }
    };

    const displayWinner = (winner) => {
        if (winner === "") return message.textContent = 
        "It's a tie! Hit restart button to play again";
        message.textContent = `Woohoo! Player ${winner} just win!`;
    }

    restartBtn.addEventListener("click", () => gameController.resetGame());

    const resetDisplay = (playerX) => {
        fieldEl.forEach((field) => field.textContent = gameBoard.board[field]);
        displayController.displayMsg(playerX.getMark());
    };

    return {displayMsg, renderMarker, displayWinner, resetDisplay};
})();

const gameController = (() => {
    const playerX = player("X");
    const playerO = player("O");
    let round = 1;
    let winner = false;

    const playRound = (index) => {
        if (winner === true) return;
        if (round % 2 === 0) {
            gameBoard.updateBoard(index, playerO.getMark());
            displayController.displayMsg(playerX.getMark());

        } else {
            gameBoard.updateBoard(index, playerX.getMark());
            displayController.displayMsg(playerO.getMark());
        }
        round++;
        gameController.checkForWinner();
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        displayController.resetDisplay(playerX);
        round = 1;
        winner = false;
    };

    const checkForWinner = () => {
        const winCombinations = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [2, 5, 8],
            [6, 7, 8],
            [3, 4, 5],
            [6, 4, 2],
            [1, 4, 7]
        ];

        winCombinations.forEach((combi) => {
            if (gameBoard.board[combi[0]] === "X" && gameBoard.board[combi[1]] === "X"
                && gameBoard.board[combi[2]] === "X") { 
                displayController.displayWinner(playerX.getMark());
                winner = true;

            } else if (gameBoard.board[combi[0]] === "O" && gameBoard.board[combi[1]] === "O"
                && gameBoard.board[combi[2]] === "O") {
                displayController.displayWinner(playerO.getMark());
                winner = true;

            } else if (round === 10) {
                displayController.displayWinner("");
            }
        })
    };

    return {playRound, resetGame, checkForWinner};
})();