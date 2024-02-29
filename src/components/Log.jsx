// styles
import styles from "./Log.module.css";

export default function Log({ turns, playerName }) {
  return (
    <ol id={styles.log}>
      <h2>Moves</h2>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          <span>{playerName[turn.player]} </span> selected row: {turn.square.row + 1}, col: {turn.square.col + 1}
        </li>
      ))}
    </ol>
  );
}
