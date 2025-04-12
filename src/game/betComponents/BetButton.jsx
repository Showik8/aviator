import React from 'react'

const BetButton =({ betActive,setBetActive, num })=> {
  console.log(betActive)
  return (
    <div onClick={()=>setBetActive((pre)=>!pre)} className="green">
      BET <br />
      {num.toFixed(2)} GEL
    </div>
  );
}

export default BetButton