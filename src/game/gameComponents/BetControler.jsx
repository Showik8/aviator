import { useEffect, useState } from "react";
import {
  AutoHandler,
  BetButton,
  BetSmallButtons,
  BetInput,
} from "../betComponents/index.js";

import { useBetStore } from "../../../states/useBetStore";
import "./betControler.css";
import { useGameStore } from "../../../states/useGameStore.js";

const BetControler = ({ multiplier }) => {
  const [betAmount, setbetAmount] = useState(1.0);
  const [inputValue, setInputValue] = useState(1);

  const [betActive, setBetActive] = useState(false);

  const [autoBetControler, setAutoBetControler] = useState({
    autoBetActive: false,
    autoCashOut: false,
    autoCashOutBetAmount: 5,
  });

  const [gameState, setGameState] = useState("started");

  let winRatio = (parseFloat(multiplier) * betAmount).toFixed(2);

  const { setBetProps } = useBetStore();
  const { flyAway } = useGameStore();

  function youWin() {
    setBetProps({
      betAmount: betAmount,
      multiplier: multiplier,
      winRatio: winRatio,
    });
  }

  useEffect(() => {
    setInputValue(betAmount);
  }, [betAmount]);

  return (
    <>
      <div className="box">
        <div className="betCounter">
          <div
            className={`inputDivAndSmallButtons ${
              betActive && !flyAway && "disabledDiv"
            }`}
          >
            <BetInput inputValue={inputValue} setbetAmount={setbetAmount} />
            <BetSmallButtons setbetAmount={setbetAmount} />
          </div>
          <BetButton
            gameState={gameState}
            setGameState={setGameState}
            multiplier={multiplier}
            setbetAmount={setbetAmount}
            youWin={youWin}
            betActive={betActive}
            setBetActive={setBetActive}
            betAmount={betAmount}
            winRatio={winRatio}
            autoBetControler={autoBetControler}
          />
        </div>

        <AutoHandler
          autoBetControler={autoBetControler}
          setAutoBetControler={setAutoBetControler}
          betActive={betActive}
        />
      </div>
    </>
  );
};

export default BetControler;
