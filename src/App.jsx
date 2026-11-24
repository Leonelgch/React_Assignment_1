import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

function App() {

  const SRC_DEFAULT = "https://i.pravatar.cc/";

  const PLAYERS = {
    X: { name: 'Player 1', avatarSrc: SRC_DEFAULT, overImage: false, wins: 0, draws: 0 },
    O: { name: 'Player 2', avatarSrc: SRC_DEFAULT, overImage: false, wins: 0, draws: 0 }
  };

  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const result = deriveResult(gameBoard, players);
  const hasDraw = !result.winner.player && gameTurns.length === 9;

  function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
  }

  function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function deriveResult(gameBoard, players) {
    let result = {
      winner: { player: null, symbol: null },
      loser: { player: null, symbol: null }
    }

    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        if (firstSquareSymbol === 'X') {
          (result.winner.player = players['X']) && (result.loser.player = players['O']) && (result.winner.symbol = 'X')
            && (result.loser.symbol = 'O');
        } else {
          (result.winner.player = players['O']) && (result.loser.player = players['X']) && (result.loser.symbol = 'X')
            && (result.winner.symbol = 'O');
        }
      }
    }
    return result;
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart(result) {
    setGameTurns([])
    setPlayers(prevPlayers => {
      if (result.winner.player) {
        const winnerSymbol = result.winner.symbol;
        return {
          ...prevPlayers,
          [winnerSymbol]: { ...prevPlayers[winnerSymbol], wins: prevPlayers[winnerSymbol].wins + 1 },
        };
      } if (hasDraw) {
        return {
          ...prevPlayers,
          X: { ...prevPlayers.X, draws: prevPlayers.X.draws + 1 },
          O: { ...prevPlayers.O, draws: prevPlayers.O.draws + 1 }
        };
      }
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: { ...prevPlayers[symbol], name: newName }
      };
    });
  }
  function handleOnMouseAvatar(status, symbol) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: { ...prevPlayers[symbol], overImage: status }
      };
    });
  }

  function handleChangeAvatar(symbol, newSrc) {
    setPlayers(prevAvatar => ({
      ...prevAvatar,
      [symbol]: { ...prevAvatar[symbol], avatarSrc: newSrc },
    }));
  }




  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players.X.name}
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
            avatarSrc={players.X.avatarSrc}
            onChangeAvatar={handleChangeAvatar}
            onMouseAvatar={handleOnMouseAvatar}
            playerStats={{ overImage: players.X.overImage, wins: players.X.wins, draws: players.X.draws }}
          />
          <Player
            initialName={players.O.name}
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
            avatarSrc={players.O.avatarSrc}
            onChangeAvatar={handleChangeAvatar}
            onMouseAvatar={handleOnMouseAvatar}
            playerStats={{ overImage: players.O.overImage, wins: players.O.wins, draws: players.O.draws }}
          />
        </ol>
        {(result.winner.player || hasDraw) && (
          <GameOver result={result} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} player={players} />
    </main>
  );
}

export default App;
