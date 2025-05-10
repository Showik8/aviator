import { useEffect, useState } from "react";
import {
  AutoHandler,
  BetButton,
  BetSmallButtons,
  BetInput,
} from "../betComponents/index";

import { useBetStore } from "../../../states/useBetStore";

import "./betControler.css";

const BetControler = ({ multiplier }) => {
  const [betAmount, setbetAmount] = useState(1.0);
  const [inputValue, setInputValue] = useState(1);
  const [autoBetActive, setAutoBetActive] = useState(false);
  const [autoCashOut, setAutoChashOut] = useState(false);
  const [betActive, setBetActive] = useState(false);
  const [autoCashOutBetAmount, setAutoCashOutBetAmount] = useState(5);

  let winRatio = (parseFloat(multiplier) * betAmount).toFixed(2);

  const { setBetProps } = useBetStore();

  function youWin() {
    const BetInfo = {
      betAmount: betAmount,
      multiplier: multiplier,
      winRatio: winRatio,
    };

    setBetProps(BetInfo);
  }

  useEffect(() => {
    setInputValue(betAmount);
  }, [betAmount]);

  const decreaseBetAmount = (value) => {
    switch (true) {
      case value < 0.01:
        return;
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
            youWin={youWin}
            betActive={betActive}
            setBetActive={setBetActive}
            betAmount={betAmount}
            winRatio={winRatio}
          />
        </div>

        <AutoHandler
          setAutoCashOutBetAmount={setAutoCashOutBetAmount}
          autoCashOutBetAmount={autoCashOutBetAmount}
          autoBetActive={autoBetActive}
          autoCashOut={autoCashOut}
          betActiv={betActive}
          setAutoBetActive={setAutoBetActive}
          setAutoChashOut={setAutoChashOut}
        />
      </div>
    </>
  );
};

export default BetControler;
