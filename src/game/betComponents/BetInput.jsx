import {
  decreaseBetAmount,
  encreaseBetAmount,
} from "../../utils/Bet_Amount_Controler.js";

const BetInput = ({ inputValue, setbetAmount }) => {
  return (
    <div className="inputDiv">
      <span onClick={() => decreaseBetAmount(inputValue, setbetAmount())}>
        -
      </span>
      <input
        className="input"
        onChange={(e) => setbetAmount(e.target.value)}
        value={inputValue}
        type="number"
      />
      <span onClick={() => encreaseBetAmount(inputValue)}>+</span>
    </div>
  );
};

export default BetInput;
