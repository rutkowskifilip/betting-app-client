import { useEffect, useState } from "react";
import api from "../../axios-instance";

export const TopScorerForm = ({ id, disabled }) => {
  const [country, setCountry] = useState(false);
  const [position, setPosition] = useState(false);
  const [player, setPlayer] = useState(false);

  const [players, setPlayers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bet/topscorer/${id}`);
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
  }, []);
  const handleCountrySelect = (e) => {
    setCountry(e.target.value);
  };

  const handlePositionSelect = (e) => {
    setPosition(e.target.value);
    setPlayer(0);
  };
  const handlePlayerSelect = (e) => {
    setPlayer(e.target.value);
  };

  const handleSaveTopScorer = async () => {
    try {
      const userId = localStorage.getItem("id");

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
      alert("There was a problem", error);
    }
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <form className="form-other-bets flex-center" autoComplete="off">
      <h1>Top scorer</h1>
      <p>Nationality:</p>
      <select
        name="country"
        id="country"
        onChange={handleCountrySelect}
        required={true}
        defaultValue={country ? country : 0}
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
        defaultValue={position ? position : 0}
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
        defaultValue={player ? player : 0}
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
      <button
        type="submit"
        id="button-sace-topscorer"
        className="button-submit"
        onClick={handleSaveTopScorer}
        disabled={disabled}
      >
        Save
      </button>
    </form>
  );
};
