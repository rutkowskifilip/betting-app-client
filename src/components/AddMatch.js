import { useEffect, useState } from "react";
import api from "../axios-instance";

export const AddMatch = (params) => {
  const [groups, setGroups] = useState([]);
  const [type, setType] = useState("Group A");
  const [weight, setWeight] = useState(1);
  const [teamOne, setTeamOne] = useState("Germany");
  const [teamTwo, setTeamTwo] = useState("Scotland");
  const [flagOne, setFlagOne] = useState("/flags/Germany.png");
  const [flagTwo, setFlagTwo] = useState("/flags/Scotland.png");
  const [location, setLocation] = useState("Munich");
  const [time, setTime] = useState("21");
  const [date, setDate] = useState("2024-06-14");
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);
  const handleTypeChange = (e) => {
    setType(e.target.value);
    if (e.target.value.charAt(0) === "G") {
      setWeight(1);
    } else {
      setWeight(2);
    }
  };
  const handleTeamOneChange = (e) => {
    setTeamOne(e.target.value);
    setFlagOne("/flags/" + e.target.value + ".png");
  };
  const handleTeamTwoChange = (e) => {
    setTeamTwo(e.target.value);
    setFlagTwo("/flags/" + e.target.value + ".png");
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/match/add", {
        type,
        weight,
        teamOne,
        teamTwo,
        location,
        time,
        date,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }
      alert(response.data);
    } catch (error) {
      alert("There was a problem", error);
    }
  };
  return (
    <div className="flex-center page-add-user">
      <div className="form-add-user flex-center">
        <select name="type" id="type" value={type} onChange={handleTypeChange}>
          <option value="Group A">Group A</option>
          <option value="Group B">Group B</option>
          <option value="Group C">Group C</option>
          <option value="Group D">Group D</option>
          <option value="Round of 16">Round of 16</option>
          <option value="Quarterfinal">Quarter-final</option>
          <option value="Semifinal">Semi-final</option>
          <option value="Final">Final</option>
        </select>
        <div className="div-team-selects flex-center">
          {flagOne ? (
            <img alt="flag" key="flag" src={flagOne} className="img-flag" />
          ) : (
            ""
          )}
          <select
            value={teamOne}
            name="teamOne"
            id="teamOne"
            onChange={handleTeamOneChange}
          >
            {groups.map((group, index) => (
              <optgroup key={index} label={"Group " + group.name}>
                {group.teams.map((team, indexx) => (
                  <option key={indexx} value={team}>
                    {team}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <select
            value={teamTwo}
            name="teamTwo"
            id="teamTwo"
            onChange={handleTeamTwoChange}
          >
            {groups.map((group, index) => (
              <optgroup key={index} label={"Group " + group.name}>
                {group.teams.map((team, indexx) => (
                  <option key={indexx} value={team}>
                    {team}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {flagTwo ? <img alt="flag" src={flagTwo} className="img-flag" /> : ""}
        </div>
        <select
          name="location"
          id="location"
          value={location}
          onChange={handleLocationChange}
        >
          <option value="Berlin">Berlin</option>
          <option value="Lipsk">Lipsk</option>
          <option value="Frankfurt">Frankfurt</option>
          <option value="Dortmund">Dortmund</option>
          <option value="Munich">Munich</option>
        </select>
        <div className="div-date-inputs flex-center">
          <div style={{ color: "var(--accent)" }}>
            <input
              type="number"
              name="time"
              id="time"
              min="0"
              max="24"
              value={time}
              onChange={handleTimeChange}
            />
            :
            <input type="number" value="00" disabled={true} />
          </div>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Add Match
        </button>
      </div>
    </div>
  );
};
