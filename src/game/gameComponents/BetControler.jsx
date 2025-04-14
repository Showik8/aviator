import { useEffect, useState } from "react";
import AutoHandler from "../betComponents/autoHandler";
import BetButton from "../betComponents/BetButton";

import "./betControler.css";
import BetSmallButtons from "../betComponents/BetSmallButtons";
import BetInput from "../betComponents/BetInput";
const BetControler = ({ gameStarted, setGameStarted }) => {
  const [betAmount, setbetAmount] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const [autoBetActive, setAutoBetActive] = useState(false);
  const [cashOut, setAutoChashOut] = useState(false);
  const [betActive, setBetActive] = useState(false);
  const [bet, setBet] = useState(false);

  useEffect(() => {
    setInputValue(betAmount);
  }, [betAmount]);

  console.log(gameStarted)

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
      {/* <Algoritm algoritm={algoritm} /> */}

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
              betAmount={betAmount}
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              bet={bet}
              setBet={setBet}
            />
          </div>

          <AutoHandler
            autoBetActive={autoBetActive}
            autoCashOut={cashOut}
            setAutoBetActive={setAutoBetActive}
            setAutoChashOut={setAutoChashOut}
          />
      </div>
    </>
  );
};

export default BetControler;
