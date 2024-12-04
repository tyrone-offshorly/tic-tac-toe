const gameBoard = (() => {
  const player1 = "X";
  const player2 = "O";
  let board = [null, null, null, null, null, null, null, null, null];
  let winner = "";
  let moveCount = 0;
  let isGameOver = false;

  const move = (position) => {
    if (isGameOver) {
      console.log("Game is terminated.")
    } else if(board[position] !== null) {
      console.log("Invalid move");
    } else {
      board[position] = getCurrentPlayer(); 
      if(checkWinner()) {
        console.log(getCurrentPlayer() + " is the winner");
        console.log(getBoard());
        isGameOver = true;
        winner = getCurrentPlayer();
      } else if (checkTie()) {
        console.log("It's a tie");
        console.log(getBoard());
        isGameOver = true;
      } else {
        moveCount++;
      }
    }
  }

  const checkWinner = () => {
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                           [0, 3, 6], [1, 4, 7], [3, 5, 8],
                           [0, 4, 8], [3, 4, 6]];
    return winConditions.some(pattern => {
      const [a, b, c] = pattern;
      return (board[a] === getCurrentPlayer() && 
      board[b] === getCurrentPlayer() && 
      board[c] === getCurrentPlayer());
     });
  }

  const checkTie = () => {
    return !(board.some(cell => {
      return cell === null;
    }));
  }

  const getCurrentPlayer = () => {
    if(moveCount % 2 === 0) {
      return player1;
    } else {
      return player2;
    }
  };

  const resetBoard = () => {
    moveCount = 0;
    board = [null, null, null, null, null, null, null, null, null];
    winner = "";
    isGameOver = false;
  }

  const getBoard = () => board;

  const getGameOver = () => isGameOver;

  return {move, getBoard, checkWinner, resetBoard, getCurrentPlayer, getGameOver};
});

const displayController = (function () {
  const promptDisplay = document.querySelector('.player-prompt');
  const cells = document.querySelectorAll('.cell');
  const game = gameBoard(); 
  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      if(!game.getGameOver()) {
        game.move(Number(cell.getAttribute("data-index") - 1));
        if(game.getGameOver()) {
          if(game.checkWinner()) {
            promptDisplay.textContent = `${game.getCurrentPlayer()} wins`;
          } else {
            promptDisplay.textContent = "It's a tie";
          }
        } else {
          promptDisplay.textContent = `${game.getCurrentPlayer()} moves`
        }
      }
      updateCells();
    });
  });

  const updateCells = () => {
    cells.forEach((cell, index) => {
      cell.textContent = game.getBoard()[index];
    })
  }

})();
