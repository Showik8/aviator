import React, { useState, useRef } from "react";
import logo from "../gameAssets/logo.svg";
import FullscreenComponent from "./FullScreen";

import "../../styles/gameMenu.css";
import BurgerMenu from "./BurgerMenu";

const SubHeader = ({ fullscreenElement }) => {
  const [userMoneyAmount, setUserMoneyAmount] = useState(1000);

  return (
    <>
      <div className="SubHeader">
        <img src={logo} alt="Aviator Logo" />
        <div className="controler">
          <span>
            <strong>{userMoneyAmount.toFixed(2)}</strong> GEL
          </span>
          <FullscreenComponent fullscreenElement={fullscreenElement} />
          <BurgerMenu/>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
