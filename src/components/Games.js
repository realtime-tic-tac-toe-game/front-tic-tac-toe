export default function Games(props) {
  return (
    <div>
      <p> game {props.idx}</p>
      <p> player name {props.playerName}</p>

      <button
        onClick={() => {
          this.props.handleJoin(props.id, props.socketId);
        }}
        join
      ></button>
    </div>
  );
}
