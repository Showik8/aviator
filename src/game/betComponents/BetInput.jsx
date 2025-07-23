import {
  decreaseBetAmount,
  encreaseBetAmount,
} from "../../utils/Bet_Amount_Controler.js";

const BetInput = ({ inputValue, setbetAmount }) => {
  function handleInputChange(e) {
    let value = e.target.value;

    if (value > 0) {
      setbetAmount(value);
    }
  }
  return (
    <div className="inputDiv">
      <span onClick={() => decreaseBetAmount(inputValue, setbetAmount())}>
        -
      </span>
      <input
        className="input"
        onChange={handleInputChange}
        value={inputValue}
        type="number"
      />
      <span onClick={() => encreaseBetAmount(inputValue)}>+</span>
    </div>
  );
};

export default BetInput;
