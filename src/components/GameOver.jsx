/* eslint-disable no-undef */
// utils
import { createPortal } from "react-dom";

export default function GameOver({ winner, onRestart }) {
  return createPortal(
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>,
    document.getElementById("backdrop"),
  );
}
