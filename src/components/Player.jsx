import { useState } from 'react';
import Avatar from './Avatar.jsx';

export default function Player({
  avatarSrc,
  initialName,
  symbol,
  isActive,
  onChangeName,
  onChangeAvatar,
  onMouseAvatar,
  playerStats
}) {

  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChangeName(event) {
    setPlayerName(event.target.value);
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChangeName} />
    );
  }
  
  function handleChangeAvatar(avatarSrc) {
    onChangeAvatar(symbol, avatarSrc);
  }

  function handleShowStats(status) {
          onMouseAvatar(status,symbol);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <Avatar
        src={avatarSrc}
        onChangeSrc={handleChangeAvatar}
        onMouseOver={handleShowStats}
        stats={playerStats}
        />
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}