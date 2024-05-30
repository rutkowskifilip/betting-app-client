import { useEffect, useState } from "react";
import api from "../../axios-instance";

export const WinnersForm = ({ disabled, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState();
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bet/winners/${id}`);
        if (response.status === 200) {
          const winners = response.data[0];
          setFirst(winners.first);
          setSecond(winners.second);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const response = await fetch("../groups.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setGroups(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  const handleFirstSelect = (e) => {
    setFirst(e.target.value);
  };
  const handleSecendSelect = (e) => {
    setSecond(e.target.value);
  };
  const handleSaveWinners = async () => {
    try {
      const userId = localStorage.getItem("id");

      const response = await api.post("/bet/winners", {
        first,
        second,
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
      <h1>Winners</h1>
      <p>First:</p>
      <select
        name="first"
        id="first"
        value={first}
        onChange={handleFirstSelect}
        required={true}
        disabled={disabled}
      >
        <option disabled value style={{ display: "none" }}>
          -- select an option --
        </option>
        {groups &&
          groups.length > 0 &&
          groups.map((group, index) => (
            <optgroup key={index} label={group.name}>
              {group.teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
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
        disabled={disabled}
      >
        <option disabled value style={{ display: "none" }}>
          -- select an option --
        </option>
        {groups.map((group, index) => (
          <optgroup key={index} label={group.name}>
            {group.teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <button
        type="submit"
        id="button-sace-topscorer"
        className="button-submit"
        onClick={handleSaveWinners}
        disabled={disabled}
      >
        Save
      </button>
    </form>
  );
};
