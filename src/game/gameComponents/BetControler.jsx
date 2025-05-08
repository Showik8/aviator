import { useEffect, useState, useContext, useRef } from "react";
import AutoHandler from "../betComponents/AutoHandler";
import BetButton from "../betComponents/BetButton";
import BetSmallButtons from "../betComponents/BetSmallButtons";
import BetInput from "../betComponents/BetInput";

import "./betControler.css";

const BetControler = ({ gameIsStarted, StarterOfGame, multiplier }) => {
  const [betAmount, setbetAmount] = useState(1.0);
  const [inputValue, setInputValue] = useState(1);
  const [autoBetActive, setAutoBetActive] = useState(false);
  const [cashOut, setAutoChashOut] = useState(false);
  const [betActive, setBetActive] = useState(false);

  let winRatio = parseFloat(multiplier) * betAmount;

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
            betActive={betActive}
            setBetActive={setBetActive}
            gameIsStarted={gameIsStarted}
            betAmount={betAmount}
            winRatio={winRatio}
          />
        </div>

        <AutoHandler
          autoBetActive={autoBetActive}
          autoCashOut={cashOut}
          betActiv={betActive}
          setAutoBetActive={setAutoBetActive}
          setAutoChashOut={setAutoChashOut}
        />
      </div>
    </>
  );
};

export default BetControler;
