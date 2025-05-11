const BetInput = ({
  inputValue,
  decreaseBetAmount,
  setbetAmount,
  encreaseBetAmount,
}) => {
  return (
    <div className="inputDiv">
      <span onClick={() => decreaseBetAmount(inputValue)}>-</span>
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
