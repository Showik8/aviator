import BetControler from "../game/gameComponents/BetControler";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";
import Aviator from "../game/canvas/Aviator";
import started from "../game/sounds/started.mp3";
import playSound from "../utils/sound.js";

import { useRef, useState } from "react";

import "../styles/game.css";

const Game = () => {
  const fullscreenElement = useRef(null);
  const [multiplier, setMultiplier] = useState("1.0x");
  const [activeTab, setActiveTab] = useState("all");
  // playSound(started);

  return (
    <>
      <div ref={fullscreenElement} className="statistic">
        <div className="gameMenu">
          <SubHeader fullscreenElement={fullscreenElement} />
          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
          <PlayersList />
        </div>
        <div className="canva">
          <Aviator multiplier={multiplier} setMultiplier={setMultiplier} />
          <div className="betButtons">
            <BetControler key={1} multiplier={multiplier} />
            <BetControler key={2} multiplier={multiplier} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
