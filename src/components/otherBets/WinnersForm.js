import { useEffect, useState } from "react";
import api from "../../axios-instance";

import Cookies from "js-cookie";
export const WinnersForm = ({ disabled }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState();
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const startDate = process.env.REACT_APP_START_DATE;
  const startHour = process.env.REACT_APP_START_HOUR;
  const userId = Cookies.get("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/bet/winners/${userId}`);
        if (response.status === 200) {
          if (response.data.length > 0) {
            const winners = response.data[0];
            setFirst(winners.first);
            setSecond(winners.second);
          }
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

        setGroups(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [userId]);
  const handleFirstSelect = (e) => {
    setFirst(e.target.value);
  };
  const handleSecendSelect = (e) => {
    setSecond(e.target.value);
  };
  const handleSaveWinners = async () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const hour = today.getHours();
    if (
      startDate > todayDate ||
      (startDate === todayDate && startHour > hour)
    ) {
      try {
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
        if (error.response) {
          setMessage(error.response.data);
        }
        // alert("There was a problem", error);
      }
    } else {
      setMessage("It is too late");
    }
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="form-other-bets flex-center" autoComplete="off">
      <h1>Winners</h1>
      <p>First:</p>
      <select
        name="first"
        id="first"
        defaultValue={first ? first : 0}
        onChange={handleFirstSelect}
        required={true}
        disabled={disabled}
      >
        <option disabled value={0} style={{ display: "none" }}>
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
        defaultValue={second ? second : 0}
        onChange={handleSecendSelect}
        required={true}
        disabled={disabled}
      >
        <option disabled value={0} style={{ display: "none" }}>
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
      {message && <p className="error-message">{message}</p>}
      <button
        type="submit"
        id="button-sace-topscorer"
        className="button-submit"
        onClick={handleSaveWinners}
        disabled={disabled || !first || !second}
      >
        Save
      </button>
    </div>
  );
};
