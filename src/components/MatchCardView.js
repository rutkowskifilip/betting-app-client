import "./css/CardView.css";

export const MatchCardView = ({ match, admin }) => {
  const calculatePoints = (matchResult, betResult, weight) => {
    if (matchResult === betResult) return 5 * weight;

    const [matchTeam1, matchTeam2] = matchResult.split(":").map(Number);
    const [betTeam1, betTeam2] = betResult.split(":").map(Number);

    return (matchTeam1 === betTeam1 && matchTeam2 === betTeam2) ||
      (matchTeam1 < matchTeam2 && betTeam1 < betTeam2) ||
      (matchTeam1 > matchTeam2 && betTeam1 > betTeam2)
      ? 3 * weight
      : 0;
  };
  const group = match.type;
  const teamOne = match.teamOne;
  const teamTwo = match.teamTwo;
  const flagOne = "/flags/" + teamOne + ".png";
  const flagTwo = "/flags/" + teamTwo + ".png";
  const time = match.time;
  const date = match.date;
  const location = match.location;
  const score = match.score;
  const bet = match.betScore;
  const weight = match.type.charAt(0) === "G" ? 1 : 2;
  const points =
    bet !== null && score.length > 2 ? calculatePoints(score, bet, weight) : "";

  const styles = {
    backgroundColor:
      points === 0
        ? "var(--error)"
        : points === 5 || points === 10
        ? "var(--accent)"
        : points === 6 || points === 3
        ? "var(--success)"
        : "",
    borderColor: points > 0 ? "var(--accent)" : "",
    borderWidth: points > 0 ? "2px" : "0",
    borderStyle: "solid",

    margin: "10px",
  };

  return (
    <div className="card-view flex-center" style={styles}>
      <p>{group}</p>
      <div className="bet-area flex-center">
        <img alt="flag" src={flagOne} className="img-flag" />
        <p>{teamOne.slice(0, 3).toUpperCase()}</p>

        <p className="score">{score}</p>

        <p>{teamTwo.slice(0, 3).toUpperCase()}</p>
        <img alt="flag" src={flagTwo} className="img-flag" />
      </div>
      {admin ? (
        ""
      ) : (
        <>
          <p className="bet">Typ: {bet}</p>
          <p className="points">Punkty: {points}</p>
        </>
      )}
      <p>{time}:00</p>
      <p>
        {date}, {location}
      </p>
    </div>
  );
};
