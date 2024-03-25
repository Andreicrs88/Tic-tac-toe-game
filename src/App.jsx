// utils
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

// components
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

// styles
import styles from "./App.module.css";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getCurrentYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
}

function switchActivePlayer(turns) {
  /* turns is an array of objects, like this:
  [
    { player: "X", square: {row: 0, col: 0},
    { player: "O", square: {row: 0, col: 3},
  ]
  */

  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    // the last move is always added at the beginning of the array -> turns[0]
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(turns) {
  /* turns is an array of objects, like this:
  [
    { player: "X", square: {row: 0 (row index), col: 0 (col index)},
    { player: "O", square: {row: 0, col: 3},
  ]
  */

  const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  // we create a deep copy of INITIAL_GAME_BOARD in order to be able to reset to initial values when handleRestart() function is triggered

  /* gameBoard is and array of 3 arrays -> looks like this after the first square (row 0, col 0) was selected
    [
      ["X", null, null],
      [null, null, null],
      [null, null, null],
    ]
  */

  turns.map((turn) => {
    const { square, player } = turn; // object destructuring
    const { row, col } = square; // object destructuring

    gameBoard[row][col] = player;

    return player;
  });

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  /* gameBoard is and array of 3 arrays -> looks like this after the first square (row 0, col 0) was selected
    [
      ["X", null, null],
      [null, null, null],
      [null, null, null],
    ]
  */

  // players is the PLAYERS object

  let winner = null;

  WINNING_COMBINATIONS.map((combination) => {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]; // X or O
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]; // players = {X: "Player 1", O: "Player 2"} -> players["X"] = "Player 1" (example)
    }

    return winner;
  });

  return winner;
}

function App() {
  const currentYear = getCurrentYear();

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = switchActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = switchActivePlayer(prevTurns);

      // we copy the old values and the new value will always be the first one: array[0]
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName }; // because symbol is a string, we must write it in []
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <>
      <main>
        <div className={styles.wrapper}>
          <div id={styles["game-container"]}>
            <h1>Tic-tac-toe</h1>
            <div
              id={styles["players-container"]}
              className={styles["highlight-player"]}
            >
              <Player
                initialName={PLAYERS.X}
                symbol="X"
                isActive={activePlayer === "X"}
                onChangeName={handlePlayerNameChange}
              />
              <Player
                initialName={PLAYERS.O}
                symbol="O"
                isActive={activePlayer === "O"}
                onChangeName={handlePlayerNameChange}
              />
            </div>
            {(winner || hasDraw) && (
              <GameOver
                onRestart={handleRestart}
                winner={winner}
              />
            )}
            <GameBoard
              onSelectSquare={handleSelectSquare}
              board={gameBoard}
            />
          </div>
          <Log
            turns={gameTurns}
            playerName={players}
          />
        </div>
      </main>
      <div className={styles.rights}>
        <p>Crisan Andrei</p>
        <p> © {currentYear} Tic-tac-toe™. All rights reserved.</p>
      </div>
    </>
  );
}

export default App;
