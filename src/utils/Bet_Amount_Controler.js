const decreaseBetAmount = (value, funct) => {
  switch (true) {
    case value < 0.01:
      break;
    case value == 1:
      funct(0.1);
      break;
    case value > 1:
      funct((pre) => pre - 1);
    default:
      break;
  }
};

const encreaseBetAmount = (funct) => {
  funct((pre) => pre + 1);
};

export { decreaseBetAmount, encreaseBetAmount };
