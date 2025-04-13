import React from "react";
import { useState } from "react";

const BetButton = ({
  betActive,
  setBetActive,
  betAmount,
  gameStarted,
  bet,
  setBet,
  setGameStarted,
}) => {
  let styles = "green";
  let textValue = "BET";

  if (gameStarted && betActive) {
    textValue = "CASH OUT";
    styles = "orange";
  }
  if (!gameStarted && betActive) {
    textValue = "WAITING";
    styles = "red";
    setTimeout(() => {
      setGameStarted(true);
    }, 4000);
  }
  if (bet) {
    styles = "red";
    textValue = "CANCEL";
  }

  const onClickHandler = () => {
    setBetActive((pre) => !pre);
    if (!gameStarted && betActive) {
      setBet(true);
    }
    setAlgoritm(true);
  };

  return (
    <div
      onClick={() => onClickHandler()}
      className={betActive ? "greenActive" : "green"}
      style={{ backgroundColor: styles }}
    >
      {textValue}
      <br />
      {betAmount.toFixed(2)} GEL
    </div>
  );
};

export default BetButton;
