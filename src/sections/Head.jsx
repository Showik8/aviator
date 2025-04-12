import logo from "../assets/logo.png";
import Button from "../components/Button";
import Navigation from "../components/Navigation";

import "../styles/component.sass";

const Head = ({ width }) => {
  let displ = "big" || "small";
  
  if(width>800){
    displ = "big"
  }else{
    displ = "small"
  }


if(displ === "big"){
  return (
    <header>
      <img src={logo} alt="Company Logo" />
      <Navigation />
      <Button href={"/game"} role={"outlined"} text={"Demo"} />
    </header>
  );
}
if(displ === "small"){
 return (
   <header className="subHeader">
     <div>
       <img src={logo} alt="Company Logo" />
       <Button role={"outlined"} href={"/game"} text={"Demo"} />
     </div>
     <Navigation />
   </header>
 );
}


};

export default Head;
