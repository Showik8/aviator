import PlayerCard from "./PlayerCard"

const PlayersList = () => {
  let totalBets = 0;
  return (
    <>
      <div className="playersList">
        <div className="totalBets">
          <span>Total Bets : {totalBets}</span>
          <div className="previous">Previous Round</div>
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
