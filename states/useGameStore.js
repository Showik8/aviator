import { create } from "zustand";

export const useGameStore = create((set) => ({
  gameState: "Started",
  flyAway: false,
  setGameState: (value) => set(() => ({ gameState: value })),
  setFlyAway: (value) => set(() => ({ flyAway: value })),
}));
