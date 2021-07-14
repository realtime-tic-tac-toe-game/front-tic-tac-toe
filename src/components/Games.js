export default function Games(props) {
  return (
    <div>
      <p> game {props.idx}</p>
      <p> player name {props.playerName}</p>

      <button
        onClick={() => {
          props.handleJoin();
          props.showJoinGame();
        }}
        join
      ></button>
    </div>
  );
}
