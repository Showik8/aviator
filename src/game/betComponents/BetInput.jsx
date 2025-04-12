import React from 'react'

const BetInput = ({inputValue,decreaseBetAmount,setNum,encreaseBetAmount}) => {
  return (
    <div className="inputDiv">
      <span onClick={() => decreaseBetAmount(inputValue)}>-</span>
      <input
        className="input"
        onChange={(e) => setNum(e.target.value)}
        value={inputValue}
        type="number"
      />
      <span onClick={() => encreaseBetAmount(inputValue)}>+</span>
    </div>
  );
}

export default BetInput