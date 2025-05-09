import { create } from "zustand";

export const useGameStore = create((set) => ({
  win: false,
  lose: false,
  flyAway: false,

  gameState: "Started",

  setWin: (value) => set(() => ({ win: value })),
  setLose: (value) => set(() => ({ lose: value })),
  setGameState: (value) => set(() => ({ gameState: value })),
  setFlyAway: (value) => set(() => ({ flyAway: value })),
}));
