import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../axios-instance";
import "./Groups.css";
import { GroupView } from "./GroupView";

import Cookies from "js-cookie";
export const Groups = () => {
  const [groups, setGroups] = useState();
  const [orderedGroups, setOrderedGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [prevGroup, setPrevGroup] = useState();
  const [nextGroup, setNextGroup] = useState();
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const hour = today.getHours();
  const startDate = process.env.REACT_APP_START_DATE;
  const startHour = process.env.REACT_APP_START_HOUR;

  const userId = Cookies.get("userId");
  useEffect(() => {
    const fetchData = async () => {
      if (!groups) {
        try {
          const response = await fetch("/groups.json");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setGroups(jsonData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      try {
        const response = await api.get(`/group/${userId}`);

        if (response.status === 200) {
          if (Object.keys(response.data).length > 0) {
            const json = [];
            Object.keys(response.data).map((key) => {
              return json.push({
                name: key,
                teams: response.data[key].split(","),
              });
            });

            setOrderedGroups(json);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (
      todayDate < startDate ||
      (todayDate === startDate && hour < startHour) ||
      parseInt(userId) === 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    fetchData();
  }, [hour, todayDate, userId, startDate, startHour]);
  useEffect(() => {
    setGroups(orderedGroups);
  }, [orderedGroups]);
  const goToNextGroup = () => {
    if (groups) {
      setCurrentGroup((currentGroup + 1) % groups.length);
    }
  };
  const goToPrevGroup = () => {
    console.log(groups);
    if (groups) {
      setCurrentGroup((currentGroup - 1 + groups.length) % groups.length);
    }
    console.log(groups[currentGroup]);
  };
  const styles = {
    paddingTop: "100px",
    paddingLeft: window.innerWidth > "800px" ? "5%" : 0,
    paddingRight: window.innerWidth > "800px" ? "5%" : 0,
    justifyContent: "space-evenly",
  };
  const handleOrderChange = (groupName, order) => {
    const updatedGroups = [...groups];

    const groupIndex = updatedGroups.findIndex(
      (group) => group.name === groupName
    );

    if (groupIndex !== -1) {
      updatedGroups[groupIndex].teams = order;

      setGroups(updatedGroups);
    }
  };
  useEffect(() => {
    if (!isLoading) {
      setPrevGroup(
        <GroupView
          group={
            groups[(currentGroup - 1 + groups.length) % groups.length].name
          }
          enabled={false}
          teams={
            groups[(currentGroup - 1 + groups.length) % groups.length].teams
          }
          onOrderChange={handleOrderChange}
        />
      );

      setNextGroup(
        <GroupView
          group={groups[(currentGroup + 1) % groups.length].name}
          enabled={false}
          teams={groups[(currentGroup + 1) % groups.length].teams}
          onOrderChange={handleOrderChange}
        />
      );
    }
  }, [currentGroup, isLoading, groups]); // Include groups in the dependency array
  const handleSaveClick = async () => {
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const hour = today.getHours();
    if (
      startDate > todayDate ||
      (startDate === todayDate && startHour > hour)
    ) {
      try {
        const response = await api.post("/group/save", {
          groups,
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
  return (
    <>
      {disabled ? (
        <div className="div-message flex-center">Typing time has elapsed.</div>
      ) : (
        ""
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="page-groups">
          <div className="flex-center" style={styles}>
            <IconButton
              onClick={goToPrevGroup}
              className="button-prev"
              style={{ padding: "0" }}
              sx={{ color: "var(--primary300)" }}
            >
              <NavigateBefore fontSize="large" />
            </IconButton>
            {window.innerWidth > 1200 ? prevGroup : ""}

            <GroupView
              group={groups[currentGroup].name}
              enabled={disabled ? false : true}
              teams={groups[currentGroup].teams}
              onOrderChange={handleOrderChange}
            />

            {window.innerWidth > 1200 ? nextGroup : ""}
            <IconButton
              onClick={goToNextGroup}
              className="button-next"
              style={{ padding: "0" }}
              sx={{ color: "var(--primary300)" }}
            >
              <NavigateNext fontSize="large" />
            </IconButton>
          </div>
          {message && <p className="error-message">{message}</p>}
          <button
            className="button-submit"
            onClick={handleSaveClick}
            disabled={disabled}
          >
            Save
          </button>
        </div>
      )}
      <p className="p-info">
        The prediction of group order is available until {startHour}:00,{" "}
        {startDate}.
      </p>
    </>
  );
};
