import { create } from "zustand";

export const useBetStore = create((set) => ({
  betProps: null,

  setBetProps: (value) => set(() => ({ betProps: value })),
}));
