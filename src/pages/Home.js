import { UnbetMatches } from "../components/UnbetMatches";
import { AllMatches } from "../components/AllMatches";
import { Menu } from "../components/Menu";
import { Table } from "../components/Table";
import { useState } from "react";
import { Groups } from "../components/Groups";
import { AddUser } from "../components/AddUser";
import { SetPassword } from "../components/SetPassword";
import { AddMatch } from "../components/AddMatch";

export const Home = (params) => {
  const [view, setView] = useState("");
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
