document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const restartBtn = document.getElementById("restart");
  const startBtn = document.getElementById("start");
  const setupScreen = document.getElementById("setup");
  const gameContainer = document.getElementById("game-container");

  let currentPlayer = "X";
  let player1Name = "";
  let player2Name = "";
  let board = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = false;

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6]             // diagonales
  ];

  function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      const winnerName = currentPlayer === "X" ? player1Name : player2Name;
      statusText.textContent = `¡Ganó ${winnerName}!`;
      isGameActive = false;
    } else if (board.every(cell => cell !== "")) {
      statusText.textContent = "¡Empate!";
      isGameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const turnName = currentPlayer === "X" ? player1Name : player2Name;
      statusText.textContent = `Turno de: ${turnName}`;
    }
  }

  function checkWinner() {
    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
  }

  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    cells.forEach(cell => (cell.textContent = ""));
    statusText.textContent = `Turno de: ${player1Name}`;
  }

  function startGame() {
    player1Name = document.getElementById("player1").value || "Jugador 1";
    player2Name = document.getElementById("player2").value || "Jugador 2";
    setupScreen.style.display = "none";
    gameContainer.style.display = "block";
    isGameActive = true;
    statusText.textContent = `Turno de: ${player1Name}`;
  }

  startBtn.addEventListener("click", startGame);
  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", restartGame);
});
