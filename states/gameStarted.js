import { atom } from "recoil";

export const gameIsStarted = atom({
  key: "GameStarted",
  default: "false",
});