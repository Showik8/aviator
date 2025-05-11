import { useBetStore } from "../../../states/useBetStore";

const PlayerCard = ({ userName, userPicture }) => {
  const { betProps, betActivated } = useBetStore();

  const { multiplier, winRatio, betAmount } = betProps || {};

  return (
    <div className={`playerCard ${winRatio ? "winner" : ""}`}>
      <div className="playerCardWrapper">
        <div className="playerProfile">
          <img src={userPicture} alt="User Picture" className="playerPicture" />
          <span>{userName}</span>
        </div>
        <span>
          {winRatio ? (
            <>
              <span>{betAmount} </span>
              <span className="winnerMultiplier">{multiplier}</span>
            </>
          ) : (
            <span>{betAmount} </span>
          )}
        </span>
      </div>
      {betProps ? <span>{winRatio}</span> : null}
    </div>
  );
};

export default PlayerCard;
