import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../axios-instance";
import { BetCardView } from "./BetCardView";

import Cookies from "js-cookie";
export const UnbetMatches = (params) => {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [prevMatch, setPrevMatch] = useState();
  const [nextMatch, setNextMatch] = useState();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [info, setInfo] = useState("Loading...");
  const [message, setMessage] = useState("");

  const userId = Cookies.get("userId");
  useEffect(() => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // Get today's date as string in "YYYY-MM-DD" format
    const hour = today.getHours();

    const fetchData = async () => {
      const response =
        parseInt(userId) === 0
          ? await api.get("/match/noscore")
          : await api.get(`/match/unbet/${userId}`);
      if (response.status === 200) {
        userId === 0
          ? setMatches(response.data)
          : setMatches(
              response.data.filter(
                (match) =>
                  match.date > todayDateString ||
                  (match.date === todayDateString &&
                    parseInt(match.time) > hour)
              )
            );

        setCurrentMatch([0]);
        setIsLoading(false);
      } else if (response.status === 201) {
        setInfo("No unbet matches");
      }
    };

    fetchData();
  }, [saved, userId]);

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
        saved={saved}
      />
    );

    setNextMatch(
      <BetCardView
        match={matches[(currentMatch + 1) % matches.length]}
        enabled={false}
        saved={saved}
      />
    );
  }, [currentMatch, matches, saved]);

  // }
  return (
    <div className="page-unbet-matches flex-center" style={styles}>
      {isLoading ? (
        <p>{info}</p>
      ) : (
        <div className="flex-center">
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
            saved={saved}
            message={message}
            setMessage={setMessage}
          />

          {window.innerWidth > 1200 ? nextMatch : ""}
          <IconButton
            onClick={goToNextMatch}
            className="button-next"
            style={{ padding: "0" }}
          >
            <NavigateNext fontSize="large" />
          </IconButton>
        </div>
      )}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};
