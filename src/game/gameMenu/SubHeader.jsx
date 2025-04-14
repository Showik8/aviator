import React, { useState } from "react";
import logo from "../gameAssets/logo.svg";

import "../../styles/gameMenu.css";

const SubHeader = () => {
    const [userMoneyAmount, setUserMoneyAmount] = useState(1000)

  return (
    <>
      <div className="SubHeader">
        <img src={logo} alt="Aviator Logo" />
        <div>
            <span><strong>{userMoneyAmount.toFixed(2)}</strong> GEL</span>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
