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
  setbetAmount,
  autoBetControler,
  multiplier,
}) => {
  const [state, setState] = useState("bet");
  const ButtonRef = useRef();
  const youWinMessage = () =>
    toast.success(`Congratulation You Win ${winRatio}.GEL`);

  const { gameState, flyAway } = useGameStore();
  const { setUserMoneyAmount, userMoneyAmount } = userStore();
  const { setBetProps } = useBetStore();

  const { autoCashOut, autoCashOutBetAmount, autoBetActive } = autoBetControler;

  useEffect(() => {
    if (autoCashOut && betActive && gameState == "Started") {
      let SLICEDMULTIPLIER = Number(multiplier.slice(0, 3));

      if (autoCashOutBetAmount == SLICEDMULTIPLIER) {
        youWinMessage();
        youWin();
        setUserMoneyAmount(+winRatio);
        setState("waiting");
        setBetActive(false);
      }
    }
  }, [autoCashOut, betActive, gameState, multiplier, autoCashOutBetAmount]);

  useEffect(() => {
    if (autoBetActive && gameState == "loading") {
      handleClick();
    }
  }, [autoBetActive, gameState]);

  useEffect(() => {
    gameState == "Started" && !betActive
      ? setState("waiting")
      : setState("bet");

    if (userMoneyAmount == 0) {
      setBetActive(false);
      setState("waiting");
      toast.error("You don't have enough money to bet");
    }
  }, [gameState, userMoneyAmount]);

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
  }, [betActive, gameState, flyAway, betAmount]);

  const handleClick = () => {
    setBetActive((pre) => !pre);

    checkUserMoney();

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

  const checkUserMoney = () => {
    if (userMoneyAmount / 2 <= betAmount) {
      setbetAmount(userMoneyAmount / 2);
      setBetActive(true);
      return true;
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
        {gameState == "loading" && betActive ? betAmount : null}
      </button>
      <Toaster position="top-right" />
    </>
  );
};

export default BetButton;
