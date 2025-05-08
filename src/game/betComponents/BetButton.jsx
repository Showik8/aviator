import { useEffect, useState, useRef } from "react";
import { buttonRecord } from "../../utils/_utils";

const BetButton = ({
  winRatio,
  gameIsStarted,
  betAmount,
  betActive,
  setBetActive,
}) => {
  const [state, setState] = useState("bet");
  const ButtonRef = useRef();

  useEffect(() => {
    gameIsStarted ? setState("waiting") : setState("bet");
  }, [gameIsStarted]);

  const handleClick = () => {
    setBetActive((pre) => !pre);

    // if (!gameIsStarted) {
    //   if (state === "bet") {
    //     setState("cancel");
    //   } else if (state === "cancel") {
    //     setState("cashout");
    //   } else if (state === "cashout") {
    //     setState("bet");
    //   }
    // }

    if (gameIsStarted && betActive) {
      setState("cashout");
    }

    if (gameIsStarted && !betActive) {
      setState("waiting");
    }

    if (!gameIsStarted && betActive) {
      setState("cancel");
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
      {/* {gameIsStarted && !betActive ? `${betAmount.toFixed(2)} GEL` : null} */}
      {/* {gameIsStarted && betActive ? winRatio : null} */}
    </button>
  );
};

export default BetButton;
