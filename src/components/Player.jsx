// utils
import { useState } from "react";

// styles
import styles from "./Player.module.css";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span>{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        className={styles["player-input"]}
        type="text"
        value={playerName}
        required
        onChange={handleInputChange}
      />
    );
  }

  return (
    <div className={`${styles.player} ${isActive && styles.active}`}>
      <div className={styles["player-name"]}>
        {editablePlayerName}
        <span className={`${symbol === "X" ? styles["x-symbol"] : styles["o-symbol"]}`}>{symbol}</span>
      </div>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit name"}</button>
    </div>
  );
}
