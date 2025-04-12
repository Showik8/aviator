import { useEffect, useState } from "react";
import AutoHandler from "../betComponents/autoHandler";
import BetButton from "../betComponents/BetButton";

import "./betControler.css";
import BetSmallButtons from "../betComponents/betSmallButtons";
import BetInput from "../betComponents/BetInput";
const BetControler = () => {
  const [num, setNum] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const [autoBetActive, setAutoBetActive] = useState(false);
  const [cashOut, setAutoChashOut] = useState(false)
  const [betActive, setBetActive] = useState(false)

  useEffect(() => {
    setInputValue(num);
  }, [num]);

  const decreaseBetAmount = (value) => {
    switch (true) {
      case value < 0.01:
        return;
      case value == 1:
        setNum(0.1);
        break;
      case value > 1:
        setNum((pre) => pre - 1);
      default:
        break;
    }
  };

  const encreaseBetAmount = () => {
    setNum((pre) => pre + 1);
  };

  return (
    <>
      <div className="betControler">
        <div className="box">
          <div className="betCounter">
            <div className="inputDivAndSmallButtons">
              <BetInput
                inputValue={inputValue}
                decreaseBetAmount={decreaseBetAmount}
                encreaseBetAmount={encreaseBetAmount}
                setNum={setNum}
              />
              <BetSmallButtons setNum={setNum} />
            </div>
            <BetButton
              betActive={betActive}
              setBetActive={setBetActive}
              num={num}
            />
          </div>

          <AutoHandler
            autoBetActive={autoBetActive}
            autoCashOut={cashOut}
            setAutoBetActive={setAutoBetActive}
            setAutoChashOut={setAutoChashOut}
          />
        </div>
      </div>
    </>
  );
};

export default BetControler;
