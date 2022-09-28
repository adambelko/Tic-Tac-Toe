
const gameBoard = (() => {
    const board = ["O", "O", "", "X", "O", "", "", "X", ""];
    return {board};
})();

const displayController = (() => {
    const boardField = document.querySelectorAll(".gameboard-field");
    const restartBtn = document.querySelector(".restart-btn");

    boardField.forEach(field => {
        // field.addEventListener("click", e => {
        field.textContent = gameBoard.board[field.dataset.index];
        // })
    })
})();