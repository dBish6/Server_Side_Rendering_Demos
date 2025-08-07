/**
 * SSR Demo: Vite + React
 *
 * Author: David Bishop
 */

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./components/Header";

import { routes } from "./routes";

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <>
            <Header />
            <main>
              <Outlet />
            </main>
          </>
        }
      >
        {Object.entries(routes).map(([path, elem]) => (
          <Route key={path} path={path} element={elem} />
        ))}
        {typeof window !== "undefined" && (
          <Route path="/" element={<Navigate to="/home" />} />
        )}
        {typeof window !== "undefined" && (
          <Route path="*" element={<Navigate to="/error-404" />} />
        )}
      </Route>
    </Routes>
  );
}
