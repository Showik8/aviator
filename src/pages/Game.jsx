import BetControler from "../game/gameComponents/BetControler";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";
import Aviator from "../game/canvas/Aviator";

import { useRef, useState, useEffect } from "react";
import { Atom } from "react-loading-indicators";
import { useGameStore } from "../../states/useGameStore";

import "../styles/game.css";

const Game = () => {
  const fullscreenElement = useRef(null);
  const [multiplier, setMultiplier] = useState("1.0x");

  const { gameState, setGameState, setFlyAway } = useGameStore();

  useEffect(() => {
    const game = window.aviatorGame || null;

    if (game) {
      if (game.flyingAway) {
        setFlyAway(true);
        setTimeout(() => {
          setGameState("loading");
        }, 2000);
      }

      if (gameState == "loading") {
        setGameState("Started");
        setFlyAway(false);
        game.reset();
      }
    }
  }, [window.aviatorGame?.flyingAway]);

  return (
    <>
      <div ref={fullscreenElement} className="testing">
        <div className="gameMenu">
          <SubHeader fullscreenElement={fullscreenElement} />
          <TabSwitcher />
          <PlayersList />
        </div>
        <div className="canva">
          {gameState == "loading" ? (
            <div className="loadingAnimation">
              <Atom
                color="#9b0707"
                size="large"
                text="Waiting Next Round"
                textColor="White"
              />
            </div>
          ) : (
            <Aviator multiplier={multiplier} setMultiplier={setMultiplier} />
          )}

          <div className="betButtons">
            <BetControler multiplier={multiplier} />
            <BetControler multiplier={multiplier} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
