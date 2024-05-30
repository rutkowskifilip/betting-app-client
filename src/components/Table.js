import { useEffect, useMemo, useState } from "react";
import api from "../axios-instance";
import "./css/Table.css";
import { TableElement } from "./TableElement";

export const Table = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/table");
        if (response.status === 200) {
          setPlayers(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const calculatePoints = (betScore, matchScore) => {
    if (betScore === matchScore) return 5;

    const [betTeam1, betTeam2] = betScore.split(":").map(Number);
    const [matchTeam1, matchTeam2] = matchScore.split(":").map(Number);

    if (
      (betTeam1 > betTeam2 && matchTeam1 > matchTeam2) ||
      (betTeam1 < betTeam2 && matchTeam1 < matchTeam2) ||
      (betTeam1 === betTeam2 && matchTeam1 === matchTeam2)
    ) {
      return 3;
    }

    return 0;
  };

  const createPlayersStats = (data) => {
    const playersStats = {};

    data.forEach((e) => {
      if (!playersStats[e.username]) {
        playersStats[e.username] = {
          username: e.username,
          points: 0,
          perfectBets: 0,
          goodBets: 0,
        };
      }

      if (e.betScore && e.score) {
        const points = calculatePoints(e.betScore, e.score);
        playersStats[e.username].points += points;
        if (points === 5) {
          playersStats[e.username].perfectBets += 1;
        } else if (points === 3) {
          playersStats[e.username].goodBets += 1;
        }
      }
    });

    const sortedPlayersStats = Object.values(playersStats).sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Sort by points in descending order
      } else {
        return b.perfectBets - a.perfectBets; // Sort by perfectBets in descending order if points are the same
      }
    });

    return sortedPlayersStats;
  };

  const playersTable = useMemo(
    () => createPlayersStats(players),
    [players, createPlayersStats]
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex-center" style={{ paddingTop: "100px" }}>
      <div className="table">
        <div className="table-element">
          <div className="table-cell flex-center"></div>
          <div className="table-cell flex-center">Name</div>
          <div className="table-cell flex-center">Points</div>
          <div className="table-cell flex-center">Perfect Bets</div>
          <div className="table-cell flex-center">Good Bets</div>
        </div>
        {playersTable.map((player, index) => (
          <TableElement key={index} position={index} player={player} />
        ))}
      </div>
    </div>
  );
};
