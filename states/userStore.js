import { create } from "zustand";

export const userStore = create((set) => ({
  userMoneyAmount: 1000,
  userPicture:
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
  userName: "Lasha",

  setUserMoneyAmount: (value) =>
    set((state) => ({
      userMoneyAmount: state.userMoneyAmount + value,
    })),
}));
