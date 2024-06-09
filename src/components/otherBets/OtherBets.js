import React, { useEffect, useState } from "react";
import { TopScorerForm } from "./TopScorerForm";
import { WinnersForm } from "./WinnersForm";
import "./OtherBets.css";
import Cookies from "js-cookie";

export const OtherBets = () => {
  const [disabled, setDisabled] = useState(false);
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];
  const hour = today.getHours();
  const startDate = "2024-06-14";

  const userId = Cookies.get("userId");
  useEffect(() => {
    const fetchData = async () => {
      if (
        todayDateString < startDate ||
        (todayDateString === startDate && hour < 21) ||
        parseInt(userId) === 0
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    fetchData();
  }, [hour, todayDateString, userId]);

  return (
    <>
      {disabled ? (
        <div className="div-info flex-center">Typing time has elapsed.</div>
      ) : (
        ""
      )}

      <div className="page-other-bets flex-center">
        <TopScorerForm disabled={disabled} />
        <WinnersForm disabled={disabled} />
      </div>
    </>
  );
};
