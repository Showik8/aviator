import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { gameIsStarted, } from "../../states/gameStarted";

import BetControler from "../game/gameComponents/betControler";
import plane from "../game/gameAssets/plane.png";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";

import { useState, useRef } from "react";

import "../styles/game.css";
const Game = () => {
  const fullscreenElement = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);


  if (!gameStarted) {
    setTimeout(() => {
      console.log("araaa");
    }, 2000);
  }

  return (
    <>
      <div ref={fullscreenElement} className="testing">
        <div className="gameMenu">
          <SubHeader fullscreenElement={fullscreenElement} />
          <TabSwitcher />
          <PlayersList />
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
