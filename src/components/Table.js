import { TableElement } from "./TableElement";
import "./css/Table.css";
import { FilledInput } from "@mui/material";
export const Table = ({ table }) => {
  const players = [
    { name: "Filip", points: 20, perfectBets: 10, bets: 13 },
    { name: "Jan", points: 21, perfectBets: 11, bets: 13 },
    { name: "Paweł", points: 20, perfectBets: 10, bets: 13 },
    { name: "Grzes", points: 22, perfectBets: 2, bets: 13 },
    { name: "Kok", points: 20, perfectBets: 11, bets: 13 },
    { name: "aaa", points: 32, perfectBets: 10, bets: 13 },
    { name: "Filwihdiewdip", points: 15, perfectBets: 2, bets: 13 },
    { name: "cccc", points: 4, perfectBets: 10, bets: 13 },
  ];
  const sortedPlayers = players.slice().sort((a, b) => {
    // Compare by points
    if (a.points !== b.points) {
      return b.points - a.points; // Sort by points in descending order
    }
    // If points are equal, compare by perfect bets
    return b.perfectBets - a.perfectBets; // Sort by perfect bets in descending order
  });

  console.log(sortedPlayers);
  return (
    <div className="flex-center" style={{ paddingTop: "100px" }}>
      <div className="table">
        <div className="table-element">
          <div className="table-cell flex-center"></div>
          <div className="table-cell flex-center">Name</div>
          <div className="table-cell flex-center">Points</div>
          <div className="table-cell flex-center">Perfect Bets</div>
          <div className="table-cell flex-center">Good Bets</div>
        </div>
        {sortedPlayers.map((player, index) => (
          <TableElement key={index} position={index} player={player} />
        ))}
      </div>
    </div>
  );
};
