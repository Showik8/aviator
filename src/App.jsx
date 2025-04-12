import React from "react";
import {useEffect, useState} from "react"
import { Routes, Route } from "react-router-dom";

import Head from "./sections/Head";
import Home from "./sections/Home";
import AboutUs from "./sections/AboutUs";
import Concept from "./sections/Concept";
import WhyUs from "./sections/WhyUs";
import FAQ from "./sections/Faq";

import Rame from "./pages/Rame";
import Error404Page from "./pages/Error404Page";

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
      <Route path="/game" element={<Rame />} />
      <Route path="/404" element={<Error404Page />} />
    </Routes>
  );
}

export default App;
