import PlayerCard from "./PlayerCard";
import clock from "../gameAssets/clock.svg";

import { userStore } from "../../../states/userStore";

const PlayersList = () => {
  const { userPicture, userName } = userStore();

  let totalBets = 1;
  return (
    <>
      <div className="playersList">
        <div className="totalBets">
          <span>Total Bets : {totalBets}</span>
          <div className="previous">
            <img className="clock" src={clock} alt="clock" /> Previous Round
          </div>
        </div>
        <div className="listCards">
          <div className="listNames">
            <div>
              <span>Player</span>
              <span>Bet</span>
            </div>
            <span>Win</span>
          </div>
          <div className="playersCards">
            <PlayerCard userName={userName} userPicture={userPicture} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayersList;
