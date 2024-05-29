import { useEffect, useState } from "react";
import { BetCardView } from "./BetCardView";
import { IconButton } from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  SettingsOverscanRounded,
} from "@mui/icons-material";
import api from "../axios-instance";
export const UnbetMatches = (params) => {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [prevMatch, setPrevMatch] = useState();
  const [nextMatch, setNextMatch] = useState();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [info, setInfo] = useState("Loading...");
  useEffect(() => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // Get today's date as string in "YYYY-MM-DD" format
    const hour = today.getHours();
    const fetchData = async () => {
      const response = await api.get("/match/unbet/1");
      if (response.status === 200) {
        setMatches(
          response.data.filter(
            (match) =>
              match.date > todayDateString ||
              (match.date === todayDateString && parseInt(match.time) > hour)
          )
        );

        setCurrentMatch([0]);
        setIsLoading(false);
      } else if (response.status === 201) {
        setInfo("No unbet matches");
      }
    };

    fetchData();
  }, [saved]);

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
        <p>{info}</p>
      ) : (
        <>
          <IconButton
            onClick={goToPrevMatch}
            className="button-prev"
            style={{ padding: "0" }}
          >
            <NavigateBefore fontSize="large" />
          </IconButton>
          {window.innerWidth > 1200 ? prevMatch : ""}

          <BetCardView
            match={matches[currentMatch]}
            enabled={true}
            setSaved={setSaved}
          />

          {window.innerWidth > 1200 ? nextMatch : ""}
          <IconButton
            onClick={goToNextMatch}
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
