import { create } from "zustand";

export const userStore = create((set) => ({
  userMoneyAmount: 1000,

  setUserMoneyAmount: (value) =>
    set((state) => ({
      userMoneyAmount: state.userMoneyAmount + value,
    })),
}));
