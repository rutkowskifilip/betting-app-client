import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddMatch } from "../components/AddMatch";
import { AddUser } from "../components/AddUser";
import { AllMatches } from "../components/AllMatches";
import { Groups } from "../components/groups/Groups";
import { Menu } from "../components/Menu";
import { OtherBets } from "../components/otherBets/OtherBets";
import { Table } from "../components/table/Table";
import { UnbetMatches } from "../components/UnbetMatches";

export const Home = (params) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
    }
  }, []);

  const [view, setView] = useState(<Table />);
  const changeView = (id) => {
    if (id === "unbet") {
      setView(<UnbetMatches />);
    } else if (id === "table") {
      setView(<Table />);
    } else if (id === "all") {
      setView(<AllMatches />);
    } else if (id === "rules") {
      setView("");
    } else if (id === "groups") {
      setView(<Groups />);
    } else if (id === "otherBets") {
      setView(<OtherBets />);
    } else if (id === "addMatch") {
      setView(<AddMatch />);
    } else if (id === "addUser") {
      setView(<AddUser />);
    } else {
      setView("");
    }
  };
  return (
    <>
      <Menu onItemClick={changeView} />
      {view}
    </>
  );
};
