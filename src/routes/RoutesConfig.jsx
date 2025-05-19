import Error404Page from "../pages/Error404Page";
import Game from "../pages/Game";
import { HomePageLayout } from "../pages/HomePageLayout";

export const getRoutesConfig = (width) => [
  {
    path: "/",
    element: <HomePageLayout width={width} />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/404",
    element: <Error404Page />,
  },
];
