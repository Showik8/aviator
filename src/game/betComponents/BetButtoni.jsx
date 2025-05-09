import { useEffect, useState, useRef } from "react";
import { buttonRecord } from "../../utils/_utils";

const BetButton = ({
  winRatio,
  gameIsStarted,
  betAmount,
  betActive,
  setBetActive,
  setWin,
}) => {
  const [state, setState] = useState("bet");
  const ButtonRef = useRef();

  useEffect(() => {
    gameIsStarted && !betActive ? setState("waiting") : setState("bet");
  }, [gameIsStarted]);
  //

  //
  useEffect(() => {
    if (betActive && gameIsStarted) {
      setState("cashout");
    }

    if (betActive && !gameIsStarted) {
      setState("cancel");
    }
  }, [betActive, gameIsStarted]);

  const handleClick = () => {
    setBetActive((pre) => !pre);

    if (state === "cancel") {
      setState("bet");
    }

    if (state === "cashout") {
      console.log("winner");
      setWin(true);
      setBetActive(false);
    }
  };

  let buttonColor = buttonRecord[state].color;
  let buttonText = buttonRecord[state].text;

  return (
    <button
      ref={ButtonRef}
      onClick={handleClick}
      disabled={state === "waiting"}
      className={"betButton"}
      style={{ backgroundColor: buttonColor }}
    >
      {buttonText}
      <br />
      {gameIsStarted && betActive ? winRatio : null}
    </button>
  );
};

export default BetButton;
