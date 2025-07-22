import BigHeader from "../components/headersType/BigHeader";
import SmallHeader from "../components/headersType/SmallHeader";

import "../styles/component.sass";

const Head = ({ width }) => {
  let displ = "big" || "small";

  if (width > 800) {
    displ = "big";
  } else {
    displ = "small";
  }

  return <>{width > 800 ? <BigHeader /> : <SmallHeader />}</>;
};

export default Head;
