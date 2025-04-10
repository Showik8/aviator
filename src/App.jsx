import { useState, useEffect } from "react";
import Head from "./sections/Head";
import Home from "./sections/Home";
import AboutUs from './sections/AboutUs'
import Concept from './sections/Concept'
import WhyUs from "./sections/WhyUs";
import FAQ from "./sections/Faq";


import "./App.css";
function App() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  return (
    <>
      <Head width={width} />
      <Home width={width} />
      <AboutUs />
      <Concept width={width}/>
      <WhyUs/>
      <FAQ/>
    </>
  );
}

export default App;
