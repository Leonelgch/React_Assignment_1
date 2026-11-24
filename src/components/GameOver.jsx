export default function GameOver({ result, onRestart }) {

  return (<div id="game-over">
    <h2>Game Over!</h2>
    {result.winner.player ? (
      <>
        <img src={result.winner.player.avatarSrc} style={{
          width: "100px",
          height: "100px"
        }} />
        <p>{result.winner.player.name} <span style={{
          color: "green"
        }}>Won!</span></p>
      </>
    ) : (
      <>
        <p style={{
          color: "yellow"
        }}>It's a draw!</p>
      </>
    )}
    < button onClick={() => onRestart(result)}>Rematch!</button>
  </div >
  );
}
