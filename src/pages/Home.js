import { UnbettedMatches } from "../components/UnbettedMatches";
import { AllMatches } from "../components/AllMatches";
import { Menu } from "../components/Menu";
import { Table } from "../components/Table";
import { useState } from "react";

export const Home = (params) => {
  const [view, setView] = useState();
  const changeView = (id) => {
    if (id == "unbetted") {
      setView(<UnbettedMatches />);
    } else if (id === "table") {
      setView(<Table />);
    } else if (id === "all") {
      setView(<AllMatches />);
    } else if (id === "rules") {
      setView("");
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
