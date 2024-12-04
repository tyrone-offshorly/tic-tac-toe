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
        resetBoard();
      } else if (checkTie()) {
        console.log("It's a tie");
        console.log(getBoard());
        isGameOver = true;
        resetBoard();
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

  return {move, getBoard, checkWinner};
})();

// X wins
gameBoard.move(0); // X
gameBoard.move(3); // O
gameBoard.move(1); // X
gameBoard.move(4); // O
gameBoard.move(2); // X wins with the top row
// O wins
gameBoard.move(0); // X
gameBoard.move(3); // O
gameBoard.move(1); // X
gameBoard.move(4); // O
gameBoard.move(8); // X
gameBoard.move(5); // O wins with the second column
// Tie
gameBoard.move(0); // X
gameBoard.move(1); // O
gameBoard.move(2); // X
gameBoard.move(4); // O
gameBoard.move(3); // X
gameBoard.move(5); // O
gameBoard.move(7); // X
gameBoard.move(6); // O
gameBoard.move(8); // X
