import { useState } from "react";

const AutoHandler = ({
  autoBetActive,
  setAutoBetActive,
  autoCashOut,
  setAutoChashOut,
}) => {

  return (
    <div className="autoHandler">
      <div className="smallebi">
        <span>Auto Bet</span>
        <div
          onClick={() => setAutoBetActive((pre) => !pre)}
          className={autoBetActive ? "buttonDiv Active" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
      </div>
      <div className="smallebi">
        <span>Auto Cash out</span>
        <div
          onClick={() => setAutoChashOut((pre) => !pre)}
          className={autoCashOut ? "buttonDiv Active" : "buttonDiv"}
        >
          <div className="oval"></div>
        </div>
            <input onChange={()=>null} className="smallAutoInput" type="number" value={5.00}/>
      </div>
    </div>
  );
};

export default AutoHandler;
