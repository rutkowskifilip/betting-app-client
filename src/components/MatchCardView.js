import { useState } from "react";
import "./css/MatchCardView.css";
import { CurrentMatches } from "./UnbetMatches";
export const MatchCardView = ({ match }) => {
  const calculatePoints = (matchResult, betResult) => {
    if (matchResult === betResult) return 5;

    const [matchTeam1, matchTeam2] = matchResult.split(":").map(Number);
    const [betTeam1, betTeam2] = betResult.split(":").map(Number);

    return (matchTeam1 === betTeam1 && matchTeam2 === betTeam2) ||
      (matchTeam1 < matchTeam2 && betTeam1 < betTeam2) ||
      (matchTeam1 > matchTeam2 && betTeam1 > betTeam2)
      ? 3
      : 0;
  };
  const group = match.type;
  const teamOne = match.teamOne;
  const teamTwo = match.teamTwo;
  const flagOne = "/flags/" + teamOne + ".png";
  const flagTwo = "/flags/" + teamTwo + ".png";
  const time = match.time + ":00";
  const date = match.date;
  const location = match.location;
  const score = match.score;
  const bet = match.betScore;
  const points =
    bet !== null && score.length > 2 ? calculatePoints(score, bet) : "";

  const styles = {
    backgroundColor:
      points === 0 ? "var(--error)" : points === 5 ? "var(--success)" : "",
    margin: "10px",
  };

  return (
    <div className="card-view flex-center" style={styles}>
      <p>{group}</p>
      <div className="bet-area flex-center">
        <img src={flagOne} className="img-flag" />
        <p>{teamOne.slice(0, 3).toUpperCase()}</p>

        <p className="score">{score}</p>

        <p>{teamTwo.slice(0, 3).toUpperCase()}</p>
        <img src={flagTwo} className="img-flag" />
      </div>
      <p className="bet">Your bet: {bet}</p>
      <p className="points">Points: {points}</p>
      <p>{time}</p>
      <p>
        {date} {location}
      </p>
    </div>
  );
};
