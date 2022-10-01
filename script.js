
const player = (marker) => {
    getMark = () => marker;
    return {getMark};
};

const gameBoard = (() => {
    const boardArr = ["", "", "", "", "", "", "", "", ""];

    const updateBoardArr = (index, marker) => {
        boardArr[index] = marker;
    };

    const reset = () => {
        for ( i = 0; i < gameBoard.boardArr.length; i++ ) {
            gameBoard.boardArr[i] = "";
        };
    }

    return {boardArr, updateBoardArr, reset};
})();

const displayController = (() => {
    const message = document.querySelector(".message");
    const fieldEl = document.querySelectorAll(".gameboard-field");
    const restartBtn = document.querySelector(".restart-btn");

    fieldEl.forEach((field) => {
        field.addEventListener("click", () => {
            index = field.dataset.index;
            if (gameBoard.boardArr[index] !== "" ) return;
            gameController.playRound(index);
            displayController.getMarkerColour(field, index);
        });
    });

    const displayMsg = (playersMark) => {
        message.textContent = `Player ${playersMark}'s turn`;
    };

    const getMarkerColour = (field, index) => {
        if (gameBoard.boardArr[index] === "X") {
            field.dataset.state = "PlayerX";
            field.textContent = gameBoard.boardArr[index];

        }else {
            field.dataset.state = "PlayerO";
            field.textContent = gameBoard.boardArr[index];
        }
    }

    const displayWinner = (winner) => {
        if (winner === "") return message.textContent = "It's a tie! Hit restart button to play again";
        message.textContent = `Woohoo! Player ${winner} just win!`;
    }

    const resetDisplay = () => {
        fieldEl.forEach((field) => {
            field.textContent = gameBoard.boardArr[field.dataset.index];
        })
    };

    restartBtn.addEventListener("click", () => {
        gameController.resetGame();
        displayController.resetDisplay();
        message.textContent = "Player X's turn";
    });

    return {displayMsg, getMarkerColour, displayWinner, resetDisplay};
})();

const gameController = (() => {
    const playerX = player("X");
    const playerO = player("O");
    let round = 1;

    const playRound = (index) => {
        if (round % 2 === 0) {
            gameBoard.updateBoardArr(index, playerO.getMark());
            displayController.displayMsg(playerX.getMark());

        } else {
            gameBoard.updateBoardArr(index, playerX.getMark());
            displayController.displayMsg(playerO.getMark());
        }
        round++;
        gameController.checkForWinner();
    };

    const resetGame = () => {
        gameBoard.reset();
        round = 1;
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

        winCombinations.forEach((el) => {
            if (gameBoard.boardArr[el[0]] === "X" && gameBoard.boardArr[el[1]] === "X" && gameBoard.boardArr[el[2]] === "X") {
                displayController.displayWinner("X");
            
            } else if (gameBoard.boardArr[el[0]] === "O" && gameBoard.boardArr[el[1]] === "O" && gameBoard.boardArr[el[2]] === "O") {
                displayController.displayWinner("O");

            } else if (round === 10) {
                displayController.displayWinner("");
            }
        })
    };

    return {playRound, resetGame, checkForWinner};
})();