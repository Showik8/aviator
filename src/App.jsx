import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FAQ, AboutUs, Head, Home, Concept, WhyUs } from "./sections/index";

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

  const routesConfig = [
    {
      path: "/",
      element: <HomePageLayout width={width} />,
    },
    {
      path: "/game",
      element: (
        <Games>
          <Game />
        </Games>
      ),
    },
    {
      path: "/404",
      element: <Error404Page />,
    },
  ];

  return (
    <Routes>
      {routesConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
