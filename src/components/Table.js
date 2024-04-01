import { TableElement } from "./TableElement";
import "./css/Table.css";
import { FilledInput } from "@mui/material";
import { useEffect, useState } from "react";
export const Table = ({ table }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/players.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        const sorted = jsonData.slice().sort((a, b) => {
          // Compare by points
          if (a.points !== b.points) {
            return b.points - a.points; // Sort by points in descending order
          }
          // If points are equal, compare by perfect bets
          return b.perfectBets - a.perfectBets; // Sort by perfect bets in descending order
        });
        setPlayers(sorted);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        {players.map((player, index) => (
          <TableElement key={index} position={index} player={player} />
        ))}
      </div>
    </div>
  );
};
