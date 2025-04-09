import logo from '../assets/logo.png'
import Button from './Button';
import Navigation from "./Navigation";

import "../styles/comp.css"

const Head = () =>{
    return (
      <>
        <header>
          <img src={logo} alt="Company Logo" />
          <Navigation />
          <Button role={"outlined"} text={"Demo"} />
        </header>
      </>
    );
}

export default Head