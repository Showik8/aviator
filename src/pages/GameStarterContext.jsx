import React, { useState, createContext } from "react";

export const GameStarterContext = createContext();
export function Games({ children }) {
  const [GameIsStarted, setGameIsStart] = useState(true);
  const StarterOfGame = () => setGameIsStart((pre) => !pre);
  return (
    <GameStarterContext.Provider value={{ GameIsStarted, StarterOfGame }}>
      {children}
    </GameStarterContext.Provider>
  );
}
