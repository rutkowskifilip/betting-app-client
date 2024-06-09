import React, { useEffect, useState } from "react";
import { TopScorerForm } from "./TopScorerForm";
import { WinnersForm } from "./WinnersForm";
import "./OtherBets.css";
import Cookies from "js-cookie";

export const OtherBets = () => {
  const [disabled, setDisabled] = useState(false);
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const hour = today.getHours();

  const startDate = process.env.REACT_APP_START_DATE;
  const startHour = process.env.REACT_APP_START_HOUR;
  const userId = Cookies.get("userId");
  useEffect(() => {
    const fetchData = async () => {
      if (
        todayDate < startDate ||
        (todayDate === startDate && hour < startHour) ||
        parseInt(userId) === 0
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    fetchData();
  }, [hour, todayDate, userId]);

  return (
    <>
      {disabled ? (
        <div className="div-info flex-center">
          Czas typowania dobiegł końca.
        </div>
      ) : (
        ""
      )}

      <div className="page-other-bets flex-center">
        <TopScorerForm disabled={disabled} />
        <WinnersForm disabled={disabled} />
      </div>
      <p className="p-info">
        Typowanie króla strzelców, mistrza i w-ce mistrza jest dostępnę do
        {startHour}:00 dnia {startDate}.
      </p>
    </>
  );
};
