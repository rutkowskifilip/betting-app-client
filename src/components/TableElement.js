export const TableElement = ({ position, player }) => {
  const styles = {
    backgroundColor:
      position === 0
        ? "var(--accent)"
        : position === 1
        ? "rgba(244,255,255,255)"
        : position === 2
        ? "rgba(183,132,135,255)"
        : "",
    color: position < 3 ? "black" : "",
    borderRadius: "50%",
    width: "60%",
    height: "60%",
  };
  return (
    <div className="table-element">
      <div className="table-cell flex-center">
        <div style={styles} className="flex-center">
          {position + 1}
        </div>
      </div>
      <div className="table-cell  flex-center">{player.name}</div>
      <div className="table-cell  flex-center">{player.points}</div>
      <div className="table-cell  flex-center">{player.perfectBets}</div>
      <div className="table-cell  flex-center">{player.bets}</div>
    </div>
  );
};
