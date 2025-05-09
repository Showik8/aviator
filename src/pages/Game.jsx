import BetControler from "../game/gameComponents/BetControler";
import SubHeader from "../game/gameMenu/SubHeader";
import TabSwitcher from "../game/gameMenu/TabSwitcher";
import PlayersList from "../game/gameMenu/PlayersList";
import Aviator from "../game/canvas/Aviator";

import { useRef, useContext, useState, useEffect } from "react";
import { GameStarterContext } from "./GameStarterContext";
import { Atom } from "react-loading-indicators";

import "../styles/game.css";

const Game = () => {
  const { GameIsStarted, StarterOfGame } = useContext(GameStarterContext);
  const fullscreenElement = useRef(null);
  const [multiplier, setMultiplier] = useState("1.0x");
  const [loading, setLoading] = useState(false);
  const [flyAway, setFlyAway] = useState(false);

  useEffect(() => {
    const game = window.aviatorGame || null;

    if (game) {
      if (game.flyingAway) {
        setFlyAway(true);
        setTimeout(() => {
          setLoading(true);
          StarterOfGame(false);
        }, 2000);
      }

      if (loading) {
        setLoading(false);
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
          {loading ? (
            <div className="loadingAnimation">
              <Atom
                color="#9b0707"
                size="large"
                text="Waiting Next Round"
                textColor="White"
              />
            </div>
          ) : (
            <Aviator
              setLoading={setLoading}
              StarterOfGame={StarterOfGame}
              multiplier={multiplier}
              setMultiplier={setMultiplier}
            />
          )}

          <div className="betButtons">
            <BetControler
              flyAway={flyAway}
              multiplier={multiplier}
              gameIsStarted={GameIsStarted}
            />
            <BetControler
              flyAway={flyAway}
              multiplier={multiplier}
              gameIsStarted={GameIsStarted}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
