// import logo from "../gameAssets/logo.png";
import FullscreenComponent from "./FullScreen";

import "../../styles/gameMenu.css";
import BurgerMenu from "./BurgerMenu";
import { userStore } from "../../../states/userStore";

const SubHeader = ({ fullscreenElement }) => {
  const { userMoneyAmount } = userStore();

  return (
    <>
      <div className="SubHeader">
        {/* <img src={logo} alt="Aviator Logo" /> */}
        <div className="controler">
          <span>
            <strong>{userMoneyAmount.toFixed(2)}</strong> GEL
          </span>
          <FullscreenComponent fullscreenElement={fullscreenElement} />
          <BurgerMenu />
        </div>
      </div>
    </>
  );
};

export default SubHeader;
