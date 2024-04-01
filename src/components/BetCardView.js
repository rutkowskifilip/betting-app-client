import { useEffect, useState } from "react";
import "./css/MatchCardView.css";
export const BetCardView = ({ match, enabled }) => {
  const [scoreTeamOne, setScoreTeamOne] = useState();
  const [scoreTeamTwo, setScoreTeamTwo] = useState();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [isLoading, setIsLoadind] = useState(true);
  const flagOne = "/flags/" + "Poland" + ".png";
  const flagTwo = "/flags/" + "France" + ".png";
  useEffect(() => {
    if (match) {
      setIsLoadind(false);
    }
  }, [match]);
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
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="card-view flex-center" style={styles}>
      <p>Group {match.group}</p>
      <div className="bet-area flex-center">
        <img src={flagOne} className="img-flag" />
        <p>{match.teamOne.slice(0, 3).toUpperCase()}</p>

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

        <p>{match.teamTwo.slice(0, 3).toUpperCase()}</p>
        <img src={flagTwo} className="img-flag" />
      </div>
      <p>{match.time}</p>
      <p>
        {match.date} {match.city}
      </p>
      {enabled ? (
        <button
          className="save-bet"
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
