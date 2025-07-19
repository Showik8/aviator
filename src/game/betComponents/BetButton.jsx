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
  const [betButtonState, setBetButtonState] = useState("bet");
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
        setBetButtonState("waiting");
        setBetActive(false);
      }
    }
  }, [autoCashOut, betActive, gameState, multiplier, autoCashOutBetAmount]);

  useEffect(() => {
    if (autoBetActive && gameState == "loading" && checkUserMoney) {
      setBetActive(true);
    }
  }, [autoBetActive, gameState]);

  useEffect(() => {
    gameState == "Started" && !betActive
      ? setBetButtonState("waiting")
      : setBetButtonState("bet");

    if (userMoneyAmount == 0) {
      setBetActive(false);
      setBetButtonState("waiting");
      toast.error("You don't have enough money to bet");
    }
  }, [gameState]);

  useEffect(() => {
    if (betActive && gameState == "Started") {
      setBetButtonState("cashout");
    }

    if (betActive && gameState !== "Started") {
      setBetProps({ betAmount });
      setBetButtonState("cancel");
    }

    if (flyAway && betActive && gameState == "Started") {
      youLose();
    }
  }, [betActive, gameState, flyAway, betAmount]);

  const handleClick = () => {
    setBetActive((pre) => !pre);

    checkUserMoney();

    if (betButtonState === "cancel") {
      setBetButtonState("bet");
    }

    if (betButtonState === "cashout") {
      setBetActive(false);
      setBetButtonState("waiting");
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

  const youLose = () => {
    setBetButtonState("waiting");
    setUserMoneyAmount(-betAmount);
    setBetActive(false);
  };

  let buttonColor = buttonRecord[betButtonState].color;
  let buttonText = buttonRecord[betButtonState].text;

  return (
    <>
      <button
        ref={ButtonRef}
        onClick={handleClick}
        disabled={betButtonState === "waiting"}
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
