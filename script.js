
const player = (mark) => {
    getMark = () => mark;
    return {getMark};
};

const gameBoard = (() => {
    const boardArr = ["", "", "", "", "", "", "", "", ""];

    const updateBoardArr = (fieldIndex, mark) => {
        boardArr[fieldIndex] = mark;
    }

    return {boardArr, updateBoardArr};
})();

const displayController = (() => {
    const message = document.querySelector(".message");
    const fieldEl = document.querySelectorAll(".gameboard-field");
    const restartBtn = document.querySelector(".restart-btn");

    const gameMove = () => {
        fieldEl.forEach((field) => {
            field.addEventListener("click", () => {
                fieldIndex = field.dataset.index;
                gameController.playRound(fieldIndex);
                field.textContent = gameBoard.boardArr[fieldIndex];
            });
        })
    }

    const displayMsg = (playersMark) => {
        message.textContent = `Player ${playersMark}'s turn`;
    };

    const resetDisplay = () => {
        fieldEl.forEach((field) => {
            field.textContent = gameBoard.boardArr[field.dataset.index];
        })
    }

    restartBtn.addEventListener("click", () => {
        gameController.resetBoardArr();
        displayController.resetDisplay();
        message.textContent = "Player X's turn"
    });

    return {gameMove, displayMsg, resetDisplay};
})();

const gameController = (() => {
    const playerX = player("X");
    const playerO = player("O");
    let round = 1;

    const playRound = (fieldIndex) => {
        if (round % 2 === 0) {
            gameBoard.updateBoardArr(fieldIndex, playerO.getMark());
            displayController.displayMsg(playerX.getMark());

        } else {
            gameBoard.updateBoardArr(fieldIndex, playerX.getMark());
            displayController.displayMsg(playerO.getMark());
        }
        round++;
    }

    const resetBoardArr = () => {
        for ( i = 0; i < gameBoard.boardArr.length; i++ ) {
            gameBoard.boardArr[i] = "";
        };
        round = 1;
    }

    return {playRound, resetBoardArr};
})();


displayController.gameMove();