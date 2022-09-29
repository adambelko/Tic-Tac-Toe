
const player = (mark) => {
    getMark = () => mark;
    return {getMark};
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const updateBoard = (fieldIndex, mark) => {
        board[fieldIndex] = mark;
    }

    return {board, updateBoard};
})();

const displayController = (() => {
    const message = document.querySelector(".message");
    const fieldEl = document.querySelectorAll(".gameboard-field");
    const restartBtn = document.querySelector(".restart-btn");

    fieldEl.forEach((field) => {
        field.addEventListener("click", () => {
            fieldIndex = field.dataset.index;
            gameController.playRound(fieldIndex);
            field.textContent = gameBoard.board[fieldIndex];
        });
    })
})();

const gameController = (() => {
    const playerX = player("X");
    const playerO = player("O");
    let round = 1;

    const playRound = (fieldIndex) => {
        (round % 2 === 0) ? gameBoard.updateBoard(fieldIndex, playerO.getMark()) : gameBoard.updateBoard(fieldIndex, playerX.getMark());
        round++;
    }

    return {playRound};
})();



// gameBoard.board.splice(fieldIndex, 1, playerX.getMark());
// console.log(gameBoard.board);
// fieldIndex.textContent = gameBoard.board[fieldIndex];
// round++;

// const updateBoard = (fieldIndex, player) => {
//     return update = () => gameBoard.board.splice(fieldIndex, 1, player);
// };