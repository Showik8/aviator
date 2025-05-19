import Navigation from "../Navigation";
import Button from "../Button";
import logo from "../../assets/logo.png";

const BigHeader = () => {
  return (
    <header>
      <img src={logo} alt="Company Logo" />
      <Navigation />
      <Button blank={true} href={"/game"} role={"outlined"} text={"Demo"} />
    </header>
  );
};

export default BigHeader;
