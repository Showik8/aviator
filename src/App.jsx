import { useState, useEffect } from "react";
import Head from "./sections/Head";
import Home from "./sections/Home";
import AboutUs from './sections/AboutUs'

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
    </>
  );
}

export default App;
