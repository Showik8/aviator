import logo from "../assets/logo.png";
import Button from "../components/Button";
import Navigation from "../components/Navigation";

import "../styles/comp.css";

const Head = ({ width }) => {
  return (
    <>
      <header>
        <img src={logo} alt="Company Logo" />
        <Navigation/>
        <Button role={"outlined"} text={"Demo"} />
      </header>
    </>
  );
};

export default Head;
