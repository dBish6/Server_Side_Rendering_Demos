import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./App";

import "./index.css";

function hydrate() {
  const router = createBrowserRouter(routes);

  return hydrateRoot(
    document.getElementById("root")!,
    <RouterProvider router={router} fallbackElement={null} />
  );
}
hydrate();
