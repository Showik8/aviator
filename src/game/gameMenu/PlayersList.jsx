import PlayerCard from "./PlayerCard"
import clock from "../gameAssets/clock.svg"

const PlayersList = () => {
  let totalBets = 0;
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
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
            <PlayerCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayersList;
