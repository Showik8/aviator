import { useEffect, useState } from "react";

const BetButton = ({ gameIsStarted, betAmount, setBetActive, betActive }) => {
  const [state, setState] = useState("bet");
  console.log(betActive);

  useEffect(() => {
    if (gameIsStarted) {
      setState("waiting");
    } else {
      setState("bet");
    }
  }, [gameIsStarted]);


  const handleClick = () => {
    setBetActive((pre) => !pre);

    if (!gameIsStarted) {
      if (state === "bet") {
        setState("cancel");
      } else if (state === "cancel") {
        setState("cashout");
      } else if (state === "cashout") {
        setState("bet");
      }
    }

  };

  const getButtonClass = () => {
    if (state == "bet") {
      return "#37a003";
    } else if (state == "cancel") {
      return "#ff1f1f";
    } else if (state == "cashout") {
      return "#e79823";
    } else {
      return "#ff1f1f";
    }
  };

  const getButtonText = () => {
    if (state == "bet") {
      return "Bet";
    } else if (state == "cancel") {
      return "Cancel";
    } else if (state == "cashout") {
      return "Cash Out";
    }
    //  else {
    //   return "Waiting";
    // }
  };

  let buttonColor = getButtonClass();

  return (
    <div
      onClick={handleClick}
      className={"betButton"}
      style={{ backgroundColor: buttonColor }}
    >
      {getButtonText()}
      <br />
      {gameIsStarted ? null : `${betAmount.toFixed(2)} GEL`}
    </div>
  );
};

export default BetButton;
