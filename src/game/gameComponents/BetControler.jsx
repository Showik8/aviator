import { useEffect, useState } from "react";
import {
  AutoHandler,
  BetButton,
  BetSmallButtons,
  BetInput,
} from "../betComponents/index.js";

import { useBetStore } from "../../../states/useBetStore";

import "./betControler.css";

const BetControler = ({ multiplier }) => {
  const [betAmount, setbetAmount] = useState(1.0);
  const [inputValue, setInputValue] = useState(1);
  const [betActive, setBetActive] = useState(false);

  const [autoBetControler, setAutoBetControler] = useState({
    autoBetActive: false,
    autoCashOut: false,
    autoCashOutBetAmount: 5,
  });

  let winRatio = (parseFloat(multiplier) * betAmount).toFixed(2);

  const { setBetProps } = useBetStore();

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

  const decreaseBetAmount = (value) => {
    switch (true) {
      case value < 0.01:
        break;
      case value == 1:
        setbetAmount(0.1);
        break;
      case value > 1:
        setbetAmount((pre) => pre - 1);
      default:
        break;
    }
  };

  const encreaseBetAmount = () => {
    setbetAmount((pre) => pre + 1);
  };

  return (
    <>
      <div className="box">
        <div className="betCounter">
          <div className="inputDivAndSmallButtons">
            <BetInput
              inputValue={inputValue}
              decreaseBetAmount={decreaseBetAmount}
              encreaseBetAmount={encreaseBetAmount}
              setbetAmount={setbetAmount}
            />
            <BetSmallButtons setbetAmount={setbetAmount} />
          </div>
          <BetButton
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
