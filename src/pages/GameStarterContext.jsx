import React, { useState, createContext } from "react";

export const GameStarterContext = createContext();
export function Games({ children }) {
  const [GameIsStarted, setGameIsStart] = useState(null);
  const StarterOfGame = (bool) => setGameIsStart(bool);

  return (
    <GameStarterContext.Provider value={{ GameIsStarted, StarterOfGame }}>
      {children}
    </GameStarterContext.Provider>
  );
}
