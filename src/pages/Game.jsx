import BetControler from "../game/gameComponents/betControler";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";
import Aviator from "../game/canvas/Aviator";

import { useRef, useContext } from "react";
import { GameStarterContext } from "./GameStarterContext";

import "../styles/game.css";

const Game = () => {
  const { GameIsStarted, StarterOfGame } = useContext(GameStarterContext);
  const fullscreenElement = useRef(null);

  return (
    <>
      <div ref={fullscreenElement} className="testing">
        <div className="gameMenu">
          <SubHeader fullscreenElement={fullscreenElement} />
          <TabSwitcher />
          <PlayersList />
        </div>
        <div className="canva">
          <Aviator />
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
