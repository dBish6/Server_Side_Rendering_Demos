/**
 * SSR Demo: Rollup + React (front-end)
 *
 * Author: David Bishop
 */

import { Outlet, Routes, Route, Navigate } from "react-router-dom";

import { Header, Footer } from "./components/partials";
import { Home } from "./views/home";
import { About } from "./views/about";
import Error404 from "./views/Error404";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="error-404" element={<Error404 />} />
        {typeof window !== "undefined" && (
          <Route path="*" element={<Navigate to="/error-404" />} />
        )}
      </Route>
    </Routes>
  )
}
