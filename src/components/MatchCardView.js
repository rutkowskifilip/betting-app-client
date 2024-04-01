import { useState } from "react";
import "./css/MatchCardView.css";
import { CurrentMatches } from "./UnbettedMatches";
export const MatchCardView = ({ match }) => {
  const group = match.group;
  const teamOne = match.teamOne;
  const teamTwo = match.teamTwo;
  const flagOne = "/flags/" + "Poland" + ".png";
  const flagTwo = "/flags/" + "France" + ".png";
  const time = match.time;
  const date = match.date;
  const city = match.city;
  const score = match.score;
  const bet = match.bet;
  const points = match.points;
  const styles = {
    backgroundColor:
      points === 0 ? "var(--error)" : points === 5 ? "var(--success)" : "",
    margin: "10px",
  };
  return (
    <div className="card-view flex-center" style={styles}>
      <p>Group {group}</p>
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
        {date} {city}
      </p>
    </div>
  );
};
