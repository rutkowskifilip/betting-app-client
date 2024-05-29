import { useEffect, useState } from "react";
import "./css/Groups.css";
import { GroupView } from "./GroupView";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(0); // Set initial currentGroup index
  const [prevGroup, setPrevGroup] = useState();
  const [nextGroup, setNextGroup] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/groups.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setGroups(jsonData);
        setIsLoading(false);
        console.log(groups, currentGroup, isLoading);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const goToNextGroup = () => {
    if (groups) {
      setCurrentGroup((currentGroup + 1) % groups.length);
    }
  };
  const goToPrevGroup = () => {
    if (groups) {
      setCurrentGroup((currentGroup - 1 + groups.length) % groups.length);
    }
  };
  const styles = {
    paddingTop: "100px",
    paddingLeft: window.innerWidth > "800px" ? "5%" : 0,
    paddingRight: window.innerWidth > "800px" ? "5%" : 0,
    justifyContent: "space-evenly",
  };
  useEffect(() => {
    if (!isLoading) {
      setPrevGroup(
        <GroupView
          group={
            groups[(currentGroup - 1 + groups.length) % groups.length].group
          }
          enabled={false}
          teams={
            groups[(currentGroup - 1 + groups.length) % groups.length].teams
          }
        />
      );

      setNextGroup(
        <GroupView
          group={groups[(currentGroup + 1) % groups.length].group}
          enabled={false}
          teams={groups[(currentGroup + 1) % groups.length].teams}
        />
      );
    }
  }, [currentGroup, isLoading]); // Include groups in the dependency array

  return (
    <div className="flex-center" style={styles}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <IconButton
            onClick={goToPrevGroup}
            className="button-prev"
            style={{ padding: "0" }}
          >
            <NavigateBefore fontSize="large" />
          </IconButton>
          {window.innerWidth > 1200 ? prevGroup : ""}

          <GroupView
            group={groups[currentGroup].group}
            enabled={true}
            teams={groups[currentGroup].teams}
          />

          {window.innerWidth > 1200 ? nextGroup : ""}
          <IconButton
            onClick={goToNextGroup}
            className="button-next"
            style={{ padding: "0" }}
          >
            <NavigateNext fontSize="large" />
          </IconButton>
        </>
      )}
    </div>
  );
};
