import { useEffect, useState } from "react";
import { BetCardView } from "./BetCardView";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
export const UnbettedMatches = (params) => {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [prevMatch, setPrevMatch] = useState();
  const [nextMatch, setNextMatch] = useState();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // Get today's date as string in "YYYY-MM-DD" format
    const hour = today.getHours();
    const fetchData = async () => {
      try {
        const response = await fetch("/matches.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setMatches(
          jsonData.filter(
            (match) =>
              match.date >= todayDateString &&
              match.bet === "" &&
              parseInt(match.time.slice(0, 2)) > hour
          )
        );
        setCurrentMatch([0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const goToNextMatch = () => {
    setCurrentMatch((currentMatch + 1) % matches.length);
  };
  const goToPrevMatch = () => {
    setCurrentMatch((currentMatch - 1 + matches.length) % matches.length);
  };
  const styles = {
    paddingTop: "100px",
    paddingLeft: window.innerWidth > "800px" ? "5%" : 0,
    paddingRight: window.innerWidth > "800px" ? "5%" : 0,
    justifyContent: "space-evenly",
  };

  useEffect(() => {
    setPrevMatch(
      <BetCardView
        match={matches[(currentMatch - 1 + matches.length) % matches.length]}
        enabled={false}
      />
    );

    setNextMatch(
      <BetCardView
        match={matches[(currentMatch + 1) % matches.length]}
        enabled={false}
      />
    );
  }, [currentMatch]);

  // }
  return (
    <div className="flex-center" style={styles}>
      {isLoading ? (
        <p>Loading...</p> // Display loading message while data is being fetched
      ) : (
        <>
          <IconButton
            onClick={goToPrevMatch}
            className="prev-button"
            style={{ padding: "0" }}
          >
            <NavigateBefore fontSize="large" />
          </IconButton>
          {window.innerWidth > 1200 ? prevMatch : ""}

          <BetCardView match={matches[currentMatch]} enabled={true} />

          {window.innerWidth > 1200 ? nextMatch : ""}
          <IconButton
            onClick={goToNextMatch}
            className="next-button"
            style={{ padding: "0" }}
          >
            <NavigateNext fontSize="large" />
          </IconButton>
        </>
      )}
    </div>
  );
};
