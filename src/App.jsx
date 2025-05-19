import { Routes, Route } from "react-router-dom";
import { getRoutesConfig } from "./routes/RoutesConfig";
import { WindowWidth } from "./utils/WIndowWidth";

function App() {
  const width = WindowWidth();
  const routesConfig = getRoutesConfig(width);

  return (
    <Routes>
      {routesConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
