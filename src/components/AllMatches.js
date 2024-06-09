import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "../axios-instance";
import { MatchCardView } from "./MatchCardView";
import "./css/AllMatches.css";
export const AllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();
  const userId = Cookies.get("userId");
  const [selectedId, setSelectedId] = useState(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get(`/user/all`);
        const matchesRes = await api.get(`/match/all/${selectedId}`);
        if (usersRes.status === 200) {
          setUsers(usersRes.data);
        }
        if (matchesRes.status === 200) {
          setMatches(matchesRes.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedId]);
  const handleUserChange = (e) => {
    setSelectedId(e.target.value);
  };
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="flex-center page-all-matches">
      <select
        name="user"
        id="user"
        className="select-user"
        value={selectedId}
        onChange={handleUserChange}
      >
        {parseInt(userId) === 0 ? (
          <option key={0} value={0}>
            admin
          </option>
        ) : (
          ""
        )}
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>
      <div className="flex-center div-all-matches">
        {matches.map((match, index) => (
          <MatchCardView
            key={index}
            match={match}
            admin={parseInt(selectedId) === 0}
          />
        ))}
      </div>
    </div>
  );
};
