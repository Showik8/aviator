import { useEffect, useRef } from "react";
import "./canvas.css";
import { initializeGame } from "./canva.js";
import { useGameStore } from "../../../states/useGameStore";

const Aviator = ({ multiplier, setMultiplier }) => {
  const { setGameState } = useGameStore();

  const canvasRef = useRef(null);
  const multiplierRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && multiplierRef.current) {
      setGameState("Started");
      const game = initializeGame(canvasRef.current, multiplierRef.current);

      game.onMultiplierUpdate((newMultiplier) => {
        setMultiplier(`${newMultiplier.toFixed(2)}x`);
      });

      return () => {
        if (gameRef.current) {
          gameRef.current.stopAnimation();
          gameRef.current = null;
        }
      };
    }
  }, []);

  return (
    <>
      <div className="app__wrapper">
        <div className="flight-path"></div>
        {multiplier ? (
          <div ref={multiplierRef} className="multiplier">
            <h3>{multiplier}</h3>
          </div>
        ) : null}
        <canvas ref={canvasRef} id="aviator"></canvas>
      </div>
    </>
  );
};
export default Aviator;
