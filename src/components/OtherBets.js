import React, { useEffect, useState } from "react";
import api from "../axios-instance";

export const OtherBets = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [players, setPlayers] = useState();
  const [groups, setGroups] = useState();
  const [topScorer, setTopScorer] = useState();
  const [winners, setWinners] = useState();
  const [country, setCountry] = useState(false);
  const [position, setPosition] = useState(false);
  const [player, setPlayer] = useState(false);

  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await api.get(`/bet/topscorer/${id}`);
        if (response.status === 200) {
          console.log(response.data[0].player);
          setCountry(response.data[0].country);
          setPosition(response.data[0].position);
          setPlayer(response.data[0].player);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const id = localStorage.getItem("id");
        const response = await api.get(`/bet/winners/${id}`);
        if (response.status === 200) {
          const arr = response.data[0].bet.split(",");
          setFirst(arr[0]);
          setSecond(arr[1]);
          setThird(arr[2]);
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
      try {
        const response = await fetch("/groups.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setGroups(jsonData);
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

  const handleFirstSelect = (e) => {
    setFirst(e.target.value);
  };
  const handleSecendSelect = (e) => {
    setSecond(e.target.value);
  };
  const handleThirdSelect = (e) => {
    setThird(e.target.value);
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
  const handleSaveWinners = async () => {
    try {
      const userId = localStorage.getItem("id");

      const response = await api.post("/bet/winners", {
        first,
        second,
        third,
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
    <div className="page-other-bets flex-center">
      <form className="form-other-bets flex-center" autoComplete="off">
        <h1>Top scorer</h1>
        <p>Nationality:</p>
        <select
          name="country"
          id="country"
          onChange={handleCountrySelect}
          required={true}
          defaultValue={country ? country : 0}
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
          disabled={!country}
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
          disabled={!position}
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
        >
          Save
        </button>
      </form>
      <form className="form-other-bets flex-center" autoComplete="off">
        <h1>Winners</h1>
        <p>First:</p>
        <select
          name="first"
          id="first"
          value={first}
          onChange={handleFirstSelect}
          required={true}
        >
          <option disabled selected value style={{ display: "none" }}>
            -- select an option --
          </option>
          {groups.map((group, index) => (
            <optgroup label={group.name}>
              {group.teams.map((team, index) => (
                <option value={team}>{team}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <p>Second:</p>
        <select
          name="second"
          id="second"
          value={second}
          onChange={handleSecendSelect}
          required={true}
        >
          <option disabled selected value style={{ display: "none" }}>
            -- select an option --
          </option>
          {groups.map((group, index) => (
            <optgroup label={group.name}>
              {group.teams.map((team, index) => (
                <option value={team}>{team}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <p>Third:</p>
        <select
          name="third"
          id="third"
          value={third}
          onChange={handleThirdSelect}
          required={true}
        >
          <option disabled selected value style={{ display: "none" }}>
            -- select an option --
          </option>
          {groups.map((group, index) => (
            <optgroup label={group.name}>
              {group.teams.map((team, index) => (
                <option value={team}>{team}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          type="submit"
          id="button-sace-topscorer"
          className="button-submit"
          onClick={handleSaveWinners}
        >
          Save
        </button>
      </form>
    </div>
  );
};
