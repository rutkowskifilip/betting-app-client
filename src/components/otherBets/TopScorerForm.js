import { useEffect, useState } from "react";
import api from "../../axios-instance";

import Cookies from "js-cookie";
export const TopScorerForm = ({ disabled }) => {
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState(false);
  const [position, setPosition] = useState(false);
  const [player, setPlayer] = useState(false);

  const [players, setPlayers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userId = Cookies.get("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bet/topscorer/${userId}`);
        if (response.status === 200) {
          setCountry(response.data.country);
          setPosition(response.data.position);
          setPlayer(response.data.player);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch("/players.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setPlayers(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [userId]);
  const handleCountrySelect = (e) => {
    setCountry(e.target.value);
    setPosition(null);
    setPlayer(null);
  };

  const handlePositionSelect = (e) => {
    setPosition(e.target.value);
    setPlayer(null);
  };
  const handlePlayerSelect = (e) => {
    setPlayer(e.target.value);
  };

  const handleSaveTopScorer = async () => {
    try {
      const response = await api.post("/bet/topscorer", {
        player,
        position,
        country,
        userId,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }
      alert(response.data);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      }
      // alert("There was a problem", error);
    }
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="form-other-bets flex-center" autoComplete="off">
      <h1>Top scorer</h1>
      <p>Nationality:</p>
      <select
        name="country"
        id="country"
        onChange={handleCountrySelect}
        required={true}
        value={country || 0}
        disabled={disabled}
      >
        <option disabled value={0} style={{ display: "none" }}>
          -- select an option --
        </option>
        {Object.keys(players).map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <p>Position:</p>
      <select
        name="position"
        id="position"
        onChange={handlePositionSelect}
        disabled={!country || disabled}
        required={true}
        value={position || 0}
      >
        <option disabled value={0} style={{ display: "none" }}>
          -- select an option --
        </option>
        {country &&
          Object.keys(players[country]).map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
      </select>
      <p>Player:</p>
      <select
        name="player"
        id="player"
        onChange={handlePlayerSelect}
        disabled={!position || disabled}
        required={true}
        value={player || 0}
      >
        <option disabled value={0} style={{ display: "none" }}>
          -- select an option --
        </option>
        {position &&
          players[country][position].map((playerName, index) => (
            <option key={index} value={playerName}>
              {playerName}
            </option>
          ))}
      </select>
      {message && <p className="error-message">{message}</p>}
      <button
        type="submit"
        id="button-sace-topscorer"
        className="button-submit"
        onClick={handleSaveTopScorer}
        disabled={disabled || !player}
      >
        Save
      </button>
    </div>
  );
};
