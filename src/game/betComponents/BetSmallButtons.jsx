import React from 'react'

const BetSmallButtons = ({setbetAmount}) => {
      const suggestedNumbers = [1, 2, 25, 100];


     const enterFixedBet = (value) => {
       setbetAmount(value);
     };
  return (
    <div className="betSmallButtons">
      {suggestedNumbers.map((n) => (
        <button onClick={() => enterFixedBet(n)} key={n} className="smallBtns">
          {n}
        </button>
      ))}
    </div>
  );
}

export default BetSmallButtons