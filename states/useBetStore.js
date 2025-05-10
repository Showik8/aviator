import { create } from "zustand";

export const useBetStore = create((set) => ({
  betActivated: false,
  autoBetActive: false,
  autoCashOut: false,
  autoCashOutBetAmount: 5,

  betProps: null,

  setBetActivated: (value) => set(() => ({ betActivated: value })),
  setAutoBetActive: (value) => set(() => ({ autoBetActive: value })),
  setAutoCashOut: (value) => set(() => ({ autoCashOut: value })),
  setAutoCashOutBetAmount: (value) =>
    set(() => ({ autoCashOutBetAmount: value })),
  setBetProps: (value) => set(() => ({ betProps: value })),
}));
