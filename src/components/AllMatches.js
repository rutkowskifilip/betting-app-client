import { useEffect, useState } from "react";
import { MatchCardView } from "./MatchCardView";

export const AllMatches = (params) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/matches.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setMatches(jsonData);
        setIsLoading(false);
        console.log(matches);
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
