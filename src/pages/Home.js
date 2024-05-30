import { useEffect, useState } from "react";
import { AddMatch } from "../components/AddMatch";
import { AddUser } from "../components/AddUser";
import { AllMatches } from "../components/AllMatches";
import { Groups } from "../components/Groups";
import { Menu } from "../components/Menu";
import { Table } from "../components/Table";
import { UnbetMatches } from "../components/UnbetMatches";
import { useNavigate } from "react-router-dom";
import { OtherBets } from "../components/OtherBets";

export const Home = (params) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/");
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
