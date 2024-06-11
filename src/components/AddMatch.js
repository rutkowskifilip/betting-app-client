import { useEffect, useState } from "react";
import api from "../axios-instance";
import "./css/AddMatch.css";
import { removePolishCharacters } from "../removePolishCharacters";
export const AddMatch = (params) => {
  const [groups, setGroups] = useState([]);
  const [type, setType] = useState("Group A");
  const [weight, setWeight] = useState(1);
  const [teamOne, setTeamOne] = useState("Niemcy");
  const [teamTwo, setTeamTwo] = useState("Szkocja");
  const [flagOne, setFlagOne] = useState("/flags/Niemcy.png");
  const [flagTwo, setFlagTwo] = useState("/flags/Szkocja.png");
  const [location, setLocation] = useState("Munich");
  const [time, setTime] = useState("21");
  const [date, setDate] = useState("2024-06-14");
  const cities = [
    "Berlin",
    "Monachium",
    "Dortmund",
    "Gelsenkirchen",
    "Stuttgart",
    "Hamburg",
    "Düsseldorf",
    "Kolonia",
    "Lipsk",
    "Frankfurt nad Menem",
  ];
  const types = [
    "Grupa A",
    "Grupa B",
    "Grupa C",
    "Grupa D",
    "Grupa E",
    "Grupa F",
    "1/8",
    "Ćwierćfinał",
    "Półfinał",
    "Finał",
  ];
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
    setFlagOne("/flags/" + removePolishCharacters(e.target.value) + ".png");
  };
  const handleTeamTwoChange = (e) => {
    setTeamTwo(e.target.value);
    setFlagTwo("/flags/" + removePolishCharacters(e.target.value) + ".png");
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
      <div className="form-add-match flex-center">
        <select name="type" id="type" value={type} onChange={handleTypeChange}>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
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
              <optgroup key={index} label={"Grupa " + group.name}>
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
              <optgroup key={index} label={"Grupa " + group.name}>
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
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
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
          Dodaj
        </button>
      </div>
    </div>
  );
};
