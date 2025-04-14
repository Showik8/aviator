import React, { useContext, useEffect, useRef, useState } from "react";
import fullScreenIcon from "../gameAssets/fullScreenIcon.svg";
import Exit from "../gameAssets/Exit.svg";

function FullscreenComponent({ fullscreenElement }) {
  const [fullScreen, setFullScreen] = useState(false);

  const openFullscreen = () => {
    const element = fullscreenElement.current;
    if (!element) return;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  };

  const onClickHandler = () => {
    if (fullScreen) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
    setFullScreen((pre) => !pre);
  };

  return (
    <img
      onClick={onClickHandler}
      src={fullScreen ? Exit : fullScreenIcon}
      alt=""
      ref={fullscreenElement}
      className="svgIcon"
    />
  );
}

export default FullscreenComponent;
