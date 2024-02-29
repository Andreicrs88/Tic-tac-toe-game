// components
import { ImCross } from "react-icons/im";
import { RiRadioButtonFill } from "react-icons/ri";

// styles
import styles from "./Gameboard.module.css";

/* eslint-disable react/no-array-index-key */
export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id={styles["game-board"]}>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  className={`${playerSymbol === "X" ? styles["x-symbol"] : styles["o-symbol"]}`}
                  onClick={() => {
                    onSelectSquare(rowIndex, colIndex);
                  }}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol === "X" ? <ImCross /> : playerSymbol === "O" && <RiRadioButtonFill />}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
