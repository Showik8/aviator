import { useEffect, useRef } from "react";
import "./canvas.css";
import { initializeGame } from "./canva";

const Aviator = ({ multiplier, setMultiplier }) => {
  const canvasRef = useRef(null);
  const multiplierRef = useRef(null);
  const gameRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current && multiplierRef.current) {
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
        <div ref={multiplierRef} className="multiplier">
          {multiplier}
        </div>
        <canvas ref={canvasRef} id="aviator"></canvas>
      </div>
    </>
  );
};
export default Aviator;
