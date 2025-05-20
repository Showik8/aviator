import Navigation from "../Navigation";
import Button from "../Button";
import logo from "../../assets/logo.png";
const SmallHeader = () => {
  return (
    <header className="subHeader">
      <div>
        <img src={logo} alt="Company Logo" />
        <Button role={"outlined"} href={"/game"} text={"Demo"} />
      </div>
      <Navigation />
    </header>
  );
};

export default SmallHeader;
