import BetControler from "../game/gameComponents/betControler";
import plane from "../game/gameAssets/plane.png"
import SubHeader from "../game/gameMenu/SubHeader"
import { useState } from "react";

import "../styles/game.css"
const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      <div className="testing">
        <div className="gameMenu">
          <SubHeader/>
        </div>
        <div className="canva">
          <img className="CanvaPhoto" src={plane} alt="" />
          <div className="betButtons">
            <BetControler
              gameStarte={gameStarted}
              setGameStarted={setGameStarted}
            />
            <BetControler
              gameStarte={gameStarted}
              setGameStarted={setGameStarted}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
