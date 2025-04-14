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
  let styles = "#37a003";
  let textValue = "BET";

  if (gameStarted && betActive) {
    textValue = "CASH OUT";
    styles = "#e79823";
  }
  if (!gameStarted && betActive) {
    textValue = "WAITING";
    styles = "#ff1f1f";

    setTimeout(() => {
      setGameStarted(true);
    }, 4000);
  }
  if (bet) {
    styles = "ff1f1f";
    textValue = "CANCEL";
  }

  const onClickHandler = () => {
    setBetActive((pre) => !pre);
    if (!gameStarted && betActive) {
      setBet(true);
    }
  };

  return (
    <div
      onClick={() => onClickHandler()}
      // className={betActive ? "greenActive" : "green"}
      className="green"
      style={{ backgroundColor: styles,}}
    >
      {textValue}
      <br />
      {betAmount.toFixed(2)} GEL
    </div>
  );
};

export default BetButton;
