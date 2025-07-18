import { useEffect, useRef, useState } from "react";
import "./canvas.css";
import { initializeGame } from "./canva.js";
import { useGameStore } from "../../../states/useGameStore";

const Aviator = ({ multiplier, setMultiplier }) => {
  const canvasRef = useRef(null);
  const multiplierRef = useRef(null);
  const gameRef = useRef(null);

  const { gameState, setGameState, setFlyAway, flyAway } = useGameStore();

  useEffect(() => {
    if (canvasRef.current && multiplierRef.current) {
      setGameState("Started");
      const game = initializeGame(canvasRef.current, multiplierRef.current);

      game.onMultiplierUpdate((newMultiplier) => {
        setMultiplier(`${newMultiplier.toFixed(2)}x`);
      });

      game.onLoadingStateChange(() => {
        if (game.loadingState.active) {
          setGameState("loading");
        } else {
          setFlyAway(false);
          setGameState("Started");
        }
      });
      return () => {
        if (gameRef.current) {
          gameRef.current.stopAnimation();
          gameRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    const game = window.aviatorGame || null;

    if (game) {
      if (game.state.flyingAway) {
        setFlyAway(true);
      }
    }
  }, [window.aviatorGame?.state?.flyingAway]);

  return (
    <>
      <div className="app__wrapper">
        <div className="flight-path"></div>
        {multiplier && (
          <div ref={multiplierRef} className="multiplier">
            {gameState != "loading" && <h3>{multiplier}</h3>}
          </div>
        )}
        <canvas ref={canvasRef} id="aviator"></canvas>
      </div>
    </>
  );
};
export default Aviator;
