import { useEffect, useState, useRef } from "react";
import { buttonRecord } from "../../utils/_utils";
import { useGameStore } from "../../../states/useGameStore";
import toast, { Toaster } from "react-hot-toast";
import { userStore } from "../../../states/userStore";
import { useBetStore } from "../../../states/useBetStore";

const BetButton = ({
  winRatio,
  betActive,
  setBetActive,
  youWin,
  betAmount,
}) => {
  const [state, setState] = useState("bet");
  const ButtonRef = useRef();
  const youWinMessage = () =>
    toast.success(`Congratulation You Win ${winRatio}.GEL`);

  const { gameState, flyAway } = useGameStore();
  const { setUserMoneyAmount } = userStore();
  const { setBetActivated, setBetProps } = useBetStore();

  useEffect(() => {
    gameState == "Started" && !betActive
      ? setState("waiting")
      : setState("bet");
  }, [gameState]);

  useEffect(() => {
    if (betActive && gameState == "Started") {
      setState("cashout");
    }

    if (betActive && gameState !== "Started") {
      setBetProps({ betAmount });
      setState("cancel");
    }

    if (flyAway && betActive && gameState == "Started") {
      setState("waiting");
      setUserMoneyAmount(-betAmount);
      setBetActive(false);
    }
    setBetActivated(betActive);
  }, [betActive, gameState, flyAway, betAmount]);

  const handleClick = () => {
    setBetActive((pre) => !pre);

    if (state === "cancel") {
      setState("bet");
    }

    if (state === "cashout") {
      setBetActive(false);
      setState("waiting");
      youWinMessage();
      youWin();
      setUserMoneyAmount(+winRatio);
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
        {gameState == "loading" && betActive ? betAmount.toFixed(2) : null}
      </button>
      <Toaster position="top-right" />
    </>
  );
};

export default BetButton;
