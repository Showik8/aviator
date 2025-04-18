import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Head from "./sections/Head";
import Home from "./sections/Home";
import AboutUs from "./sections/AboutUs";
import Concept from "./sections/Concept";
import WhyUs from "./sections/WhyUs";
import FAQ from "./sections/Faq";

import Game from "./pages/Game";
import Error404Page from "./pages/Error404Page";
import { Games } from "./pages/GameStarterContext";

function HomePageLayout({ width }) {
  return (
    <>
      <Head width={width} />
      <Home width={width} />
      <AboutUs />
      <Concept width={width} />
      <WhyUs />
      <FAQ />
    </>
  );
}

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
    <Routes>
      <Route path="/" element={<HomePageLayout width={width} />} />
      <Route
        path="/game"
        element={
          <Games>
            <Game />
          </Games>
        }
      />
      <Route path="/404" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
