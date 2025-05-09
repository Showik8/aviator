import { useState } from "react";
import logo from "../gameAssets/logo.svg";
import FullscreenComponent from "./FullScreen";

import "../../styles/gameMenu.css";
import BurgerMenu from "./BurgerMenu";
import { userStore } from "../../../states/userStore";

const SubHeader = ({ fullscreenElement }) => {
  const { userMoneyAmount } = userStore();

  return (
    <>
      <div className="SubHeader">
        <img src={logo} alt="Aviator Logo" />
        <div className="controler">
          <span>
            <strong>{userMoneyAmount}</strong> GEL
          </span>
          <FullscreenComponent fullscreenElement={fullscreenElement} />
          <BurgerMenu />
        </div>
      </div>
    </>
  );
};

export default SubHeader;
