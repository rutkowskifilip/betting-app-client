import { useState } from "react";
import "./css/MatchCardView.css";
import { CurrentMatches } from "./CurrentMatches";
export const MatchCardView = ({ match, currentMatch, enabled }) => {
  const [scoreTeamOne, setScoreTeamOne] = useState();
  const [scoreTeamTwo, setScoreTeamTwo] = useState();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const group = match;
  const teamOne = "Poland";
  const teamTwo = "France";
  const flagOne = "/flags/" + teamOne + ".png";
  const flagTwo = "/flags/" + teamTwo + ".png";
  const time = "21:00";
  const date = "01.06.2024";
  const city = "Berlin";
  const styles = {
    opacity: enabled ? 1 : 0.5,
  };
  const handleInputOneChange = (event) => {
    const value = event.target.value;
    setScoreTeamOne(value);
    setButtonEnabled(value >= 0 && scoreTeamTwo >= 0);
  };
  const handleInputTwoChange = (event) => {
    const value = event.target.value;
    setScoreTeamTwo(value);
    setButtonEnabled(value >= 0 && scoreTeamOne >= 0);
    console.log(scoreTeamOne);
  };
  const handleButtonClick = () => {
    console.log(scoreTeamOne, scoreTeamTwo);
  };
  return (
    <div className="card-view flex-center" style={styles}>
      <p>Group {group}</p>
      <div className="bet-area flex-center">
        <img src={flagOne} className="img-flag" />
        <p>{teamOne.slice(0, 3).toUpperCase()}</p>

        <input
          type="number"
          name="teamOne"
          id="teamOne"
          disabled={!enabled}
          onChange={handleInputOneChange}
        />
        <p>:</p>
        <input
          type="number"
          name="teamTwo"
          id="teamTwo"
          disabled={!enabled}
          onChange={handleInputTwoChange}
        />

        <p>{teamTwo.slice(0, 3).toUpperCase()}</p>
        <img src={flagTwo} className="img-flag" />
      </div>
      <p>{time}</p>
      <p>
        {date}, {city}
      </p>
      {enabled ? (
        <button
          class="save-bet"
          onClick={handleButtonClick}
          disabled={!isButtonEnabled}
        >
          save
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
