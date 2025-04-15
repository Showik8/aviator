import BetControler from "../game/gameComponents/betControler";
import plane from "../game/gameAssets/plane.png";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";

import { useState, useRef, useContext, createContext } from "react";
import { GameStarterContext } from "./GameStarterContext";


import "../styles/game.css";


const Game = () => {
  
  const { GameIsStarted, StarterOfGame } = useContext(GameStarterContext);

  const fullscreenElement = useRef(null);
    console.log(GameIsStarted, "Tamashi aris");



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
            <BetControler gameIsStarted={GameIsStarted} />
            <BetControler gameIsStarted={GameIsStarted} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
