import Home from "./views/Home";
import About from "./views/About";
import Support from "./views/Support";
import Error404 from "./views/Error404";

export const routes = {
  "/home": <Home />,
  "/about": <About />,
  "/support": <Support />,
  "/error-404": <Error404 />
} as const;
