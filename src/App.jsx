import { useState } from "react";
import Head from "./sections/Head";
import Home from "./sections/Home";
import AboutUs from './sections/AboutUs'

import "./App.css";
function App() {
  return (
    <>
      <Head />
      <Home />
      <AboutUs/>
    </>
  );
}

export default App;
