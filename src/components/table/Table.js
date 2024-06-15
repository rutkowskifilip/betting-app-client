import { useEffect, useState } from "react";
import api from "../../axios-instance";
import "./Table.css";
import { TableElement } from "./TableElement";

export const Table = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [playersTable, setPlayersTable] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/user/table");
        if (response.status === 200) {
          setPlayersTable(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Ładowanie...</p>
  ) : (
    <div className="flex-center" style={{ paddingTop: "100px" }}>
      <div className="table">
        <div className="table-element">
          <div className="table-cell flex-center"></div>
          <div className="table-cell flex-center"></div>
          <div className="table-cell flex-center">Punkty</div>
          <div className="table-cell flex-center">Idealne typy</div>
          <div className="table-cell flex-center">Dobre typy</div>
        </div>
        {playersTable.map((player, index) => (
          <TableElement key={index} position={index} player={player} />
        ))}
      </div>
    </div>
  );
};
