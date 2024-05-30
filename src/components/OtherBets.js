import React, { useEffect, useState } from "react";
import { TopScorerForm } from "./otherBets/TopScorerForm";
import { WinnersForm } from "./otherBets/WinnersForm";

export const OtherBets = () => {
  const [id, setId] = useState();

  const [disabled, setDisabled] = useState(false);
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0]; // Get today's date as string in "YYYY-MM-DD" format
  const hour = today.getHours();
  const startDate = "2024-06-14";

  useEffect(() => {
    const fetchData = async () => {
      setId(localStorage.getItem("id"));
      if (
        todayDateString < startDate ||
        (todayDateString === startDate && hour < 21) ||
        parseInt(id) === 0
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {disabled ? (
        <div className="div-info flex-center">Typing time has elapsed.</div>
      ) : (
        ""
      )}

      <div className="page-other-bets flex-center">
        <TopScorerForm id={id} disabled={disabled} />
        <WinnersForm id={id} disabled={disabled} />
      </div>
    </>
  );
};
