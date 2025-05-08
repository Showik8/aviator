import BetControler from "../game/gameComponents/BetControler";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";
import Aviator from "../game/canvas/Aviator";

import { useRef, useContext, useState } from "react";
import { GameStarterContext } from "./GameStarterContext";

import "../styles/game.css";

const Game = () => {
  const { GameIsStarted, StarterOfGame } = useContext(GameStarterContext);
  const fullscreenElement = useRef(null);
  const [multiplier, setMultiplier] = useState("1.0x");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div ref={fullscreenElement} className="testing">
        <div className="gameMenu">
          <SubHeader fullscreenElement={fullscreenElement} />
          <TabSwitcher />
          <PlayersList />
        </div>
        <div className="canva">
          <Aviator
            setLoading={setLoading}
            StarterOfGame={StarterOfGame}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
          />
          <div className="betButtons">
            <BetControler
              multiplier={multiplier}
              gameIsStarted={GameIsStarted}
            />
            <BetControler gameIsStarted={GameIsStarted} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
