import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "../axios-instance";
import "./css/CardView.css";

export const BetCardView = ({
  match,
  enabled,
  setSaved,
  saved,
  setMessage,
  score,
}) => {
  const [scoreTeamOne, setScoreTeamOne] = useState();
  const [scoreTeamTwo, setScoreTeamTwo] = useState();
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = Cookies.get("userId");
  useEffect(() => {
    if (match) {
      setIsLoading(false);
    }
  }, [match]);
  useEffect(() => {
    console.log("aaaaaaaa");
    setScoreTeamOne();
    setScoreTeamTwo();
  }, [score]);
  const styles = {
    opacity: enabled ? 1 : 0.5,
    transform: enabled ? "" : "scale(0.8)",
  };
  const handleInputOneChange = (event) => {
    const value = event.target.value;
    setScoreTeamOne(value);
    setButtonEnabled(value >= 0 && scoreTeamTwo >= 0 && scoreTeamTwo !== "");
  };
  const handleInputTwoChange = (event) => {
    const value = event.target.value;
    setScoreTeamTwo(value);
    setButtonEnabled(value >= 0 && scoreTeamOne >= 0 && scoreTeamOne !== "");
  };
  const handleButtonClick = async () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const hour = today.getHours();
    if (
      match.date > todayDate ||
      (match.date === todayDate && parseInt(match.time) > hour)
    ) {
      const matchId = match.id;
      const score = scoreTeamOne + ":" + scoreTeamTwo;
      try {
        const response =
          parseInt(userId) === 0
            ? await api.post("/match/score", { matchId, score })
            : await api.post("/bet/add", {
                userId,
                matchId,
                score,
              });
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Network response was not ok");
        }

        alert(response.data);
        setScoreTeamOne("");
        setScoreTeamTwo("");
        setButtonEnabled(false);
        setSaved(!saved);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data);
        }
        // alert("There was a problem", error);
      }
    } else {
      setMessage("Mecz już się rozpoczął");
      setSaved(!saved);
    }
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="card-view flex-center" style={styles}>
      <p>{match.type}</p>
      <div className="bet-area flex-center">
        <img
          alt="flag"
          src={`/flags/${match.teamOne}.png`}
          className="img-flag"
        />
        <p>{match.teamOne.slice(0, 3).toUpperCase()}</p>

        <input
          value={scoreTeamOne}
          type="number"
          name="teamOne"
          id="teamOne"
          disabled={!enabled}
          onChange={handleInputOneChange}
        />
        <p>:</p>
        <input
          value={scoreTeamTwo}
          type="number"
          name="teamTwo"
          id="teamTwo"
          disabled={!enabled}
          onChange={handleInputTwoChange}
        />

        <p>{match.teamTwo.slice(0, 3).toUpperCase()}</p>
        <img
          alt="flag"
          src={`/flags/${match.teamTwo}.png`}
          className="img-flag"
        />
      </div>
      <p>{match.time}:00</p>
      <p>
        {match.date}, {match.location}
      </p>
      {enabled ? (
        <button
          className="button-submit button-small"
          onClick={handleButtonClick}
          disabled={!isButtonEnabled}
        >
          Zapisz
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
