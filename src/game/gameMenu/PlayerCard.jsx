import React from "react";

const PlayerCard = () => {
  return (
    <div className="playerCard">
      <div className="playerCardWrapper">
        <div className="playerProfile">
          <span>username</span>
        </div>
        <span>Bet </span>
      </div>

      <span>Win Amount</span>
    </div>
  );
};

export default PlayerCard;
