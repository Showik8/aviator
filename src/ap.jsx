import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Head from "./sections/Head";
import Home from "./sections/Home";
import AboutUs from "./sections/AboutUs";
import Concept from "./sections/Concept";
import WhyUs from "./sections/WhyUs";
import FAQ from "./sections/Faq";
import Rame from "./pages/Rame";
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
      <Routes>
        <Route
          path="/"
          element={
            ((<Head width={width} />),
            (<Home width={width} />),
            (<AboutUs />),
            (<Concept width={width} />),
            (<WhyUs />),
            (<FAQ />))
          }
        />
        <Route path="/view" element={<Rame />} />
      </Routes>
    </>
  );
}

export default App;
