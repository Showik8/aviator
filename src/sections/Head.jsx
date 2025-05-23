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

  // if (displ === "big") {
  //   return (
  //     <header>
  //       <img src={logo} alt="Company Logo" />
  //       <Navigation />
  //       <Button blank={true} href={"/game"} role={"outlined"} text={"Demo"} />
  //     </header>
  //   );
  // }
  // if (displ === "small") {
  //   return (
  // <header className="subHeader">
  //   <div>
  //     <img src={logo} alt="Company Logo" />
  //     <Button role={"outlined"} href={"/game"} text={"Demo"} />
  //   </div>
  //   <Navigation />
  // </header>
  //   );
  // }

  return <>{width > 800 ? <BigHeader /> : <SmallHeader />}</>;
};

export default Head;
