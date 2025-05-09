import { useEffect, useState, useRef } from "react";
import { buttonRecord } from "../../utils/_utils";
import { useGameStore } from "../../../states/useGameStore";
import toast, { Toaster } from "react-hot-toast";
import { userStore } from "../../../states/userStore";

const BetButton = ({ winRatio, betActive, setBetActive }) => {
  const [state, setState] = useState("bet");
  const ButtonRef = useRef();
  const youWin = () => toast.success(`Congratulation You Win ${winRatio}.GEL`);

  const { gameState, setWin, flyAway, lose, setLose } = useGameStore();
  const { setUserMoneyAmount } = userStore();

  useEffect(() => {
    gameState == "Started" && !betActive
      ? setState("waiting")
      : setState("bet");
  }, [gameState]);
  //

  //
  useEffect(() => {
    if (betActive && gameState == "Started") {
      setState("cashout");
    }

    if (betActive && gameState !== "Started") {
      setState("cancel");
    }

    if (flyAway && betActive && gameState == "Started") {
      setState("waiting");
      setUserMoneyAmount(-winRatio);
      setBetActive(false);
    }
  }, [betActive, gameState, flyAway]);

  const handleClick = () => {
    setBetActive((pre) => !pre);

    if (state === "cancel") {
      setState("bet");
    }

    if (state === "cashout") {
      setBetActive(false);
      setState("waiting");
      youWin();
      setUserMoneyAmount(+winRatio);
      setWin(true);
    }
  };

  let buttonColor = buttonRecord[state].color;
  let buttonText = buttonRecord[state].text;

  return (
    <>
      <button
        ref={ButtonRef}
        onClick={handleClick}
        disabled={state === "waiting"}
        className={"betButton"}
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
        <br />
        {gameState == "Started" && betActive ? winRatio : null}
      </button>
      <Toaster position="top-right" />
    </>
  );
};

export default BetButton;
