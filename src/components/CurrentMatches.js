import { useEffect, useState } from "react";
import { MatchCardView } from "./MatchCardView";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
export const CurrentMatches = (params) => {
  const matches = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [currentMatch, setCurrentMatch] = useState(1);
  const [prevMatch, setPrevMatch] = useState();
  const [nextMatch, setNextMatch] = useState();

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
      <MatchCardView
        match={matches[(currentMatch - 1 + matches.length) % matches.length]}
        currentMatch={currentMatch}
        enabled={false}
      />
    );

    setNextMatch(
      <MatchCardView
        match={matches[(currentMatch + 1) % matches.length]}
        currentMatch={currentMatch}
        enabled={false}
      />
    );
  }, [currentMatch]);

  // }
  return (
    <div className="flex-center" style={styles}>
      <IconButton onClick={goToPrevMatch} class="prev-button">
        <NavigateBefore fontSize="large" />
      </IconButton>
      {window.innerWidth > 1200 ? prevMatch : ""}

      <MatchCardView
        match={matches[currentMatch]}
        currentMatch={currentMatch}
        enabled={true}
      />

      {window.innerWidth > 1200 ? nextMatch : ""}
      <IconButton onClick={goToNextMatch} class="next-button">
        <NavigateNext fontSize="large" />
      </IconButton>
    </div>
  );
};
