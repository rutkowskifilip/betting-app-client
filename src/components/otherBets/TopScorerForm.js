import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "../../axios-instance";

export const TopScorerForm = ({ disabled }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(true);
  const [country, setCountry] = useState(false);
  const [position, setPosition] = useState(false);
  const [player, setPlayer] = useState(false);

  const [players, setPlayers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const startDate = process.env.REACT_APP_START_DATE;
  const startHour = process.env.REACT_APP_START_HOUR;

  const userId = Cookies.get("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bet/topscorer/${userId}`);
        if (response.status === 200) {
          setCountry(response.data.country);
          setPosition(response.data.position);
          setPlayer(response.data.player);

          setMessage("Załadowano twoje poprzednie typy");
          setError(false);
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
    setMessage("");
  };

  const handlePositionSelect = (e) => {
    setPosition(e.target.value);
    setPlayer(null);
  };
  const handlePlayerSelect = (e) => {
    setPlayer(e.target.value);
  };

  const handleSaveTopScorer = async () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const hour = today.getHours();
    if (
      startDate > todayDate ||
      (startDate === todayDate && startHour > hour)
    ) {
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
          setError(true);
        }
        // alert("There was a problem", error);
      }
    } else {
      setMessage("Turniej się już rozpoczął");
      setError(true);
    }
  };
  return isLoading ? (
    <p>Ładowanie...</p>
  ) : (
    <div className="form-other-bets flex-center" autoComplete="off">
      <h1>Król Strzelców</h1>
      <p>Reprezentacja:</p>
      <select
        name="country"
        id="country"
        onChange={handleCountrySelect}
        required={true}
        value={country || 0}
        disabled={disabled}
      >
        <option disabled value={0} style={{ display: "none" }}>
          -- wybierz reprezentację --
        </option>
        {Object.keys(players).map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <p>Pozycja:</p>
      <select
        name="position"
        id="position"
        onChange={handlePositionSelect}
        disabled={!country || disabled}
        required={true}
        value={position || 0}
      >
        <option disabled value={0} style={{ display: "none" }}>
          -- wybierz pozycję --
        </option>
        {country &&
          Object.keys(players[country]).map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
      </select>
      <p>Zawodnik:</p>
      <select
        name="player"
        id="player"
        onChange={handlePlayerSelect}
        disabled={!position || disabled}
        required={true}
        value={player || 0}
      >
        <option disabled value={0} style={{ display: "none" }}>
          -- wybierz zawodnika --
        </option>
        {position &&
          players[country][position].map((playerName, index) => (
            <option key={index} value={playerName}>
              {playerName}
            </option>
          ))}
      </select>
      {message && (
        <p className={error ? "error-message" : "success-message"}>{message}</p>
      )}
      <button
        type="submit"
        id="button-sace-topscorer"
        className="button-submit"
        onClick={handleSaveTopScorer}
        disabled={disabled || !player}
      >
        Zapisz
      </button>
    </div>
  );
};
