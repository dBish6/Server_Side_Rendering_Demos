/**
 * SSR Demo: Vite-Definitive + React (front-end)
 *
 * Author: David Bishop
 */

import { Navigate, Outlet } from "react-router-dom";

import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import Support from "./views/Support";
import Error404 from "./views/Error404";

export const routes = [
  {
    path: "/",
    element: (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
    ),
    children: [
      {
        index: true,
        path: "home",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "support",
        element: <Support />
      },
      {
        path: "error-404",
        element: <Error404 />
      },
      {
        ...(typeof window !== "undefined" && {
          path: "*",
          element: <Navigate to="/error-404" replace />
        })
      }
    ]
  }
];
