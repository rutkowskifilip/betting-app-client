import { useEffect, useState } from "react";
import api from "../axios-instance";
import { MatchCardView } from "./MatchCardView";

export const AllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await api.get(`/match/all/${id}`);
        if (response.status === 200) {
          setMatches(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const styles = {
    flexDirection: "row",
    flexWrap: "wrap",
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex-center" style={styles}>
      {matches.map((match, index) => (
        <MatchCardView key={index} match={match} />
      ))}
    </div>
  );
};
