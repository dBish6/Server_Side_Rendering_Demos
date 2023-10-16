// @Author David Bishop

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Support from "./pages/Support";
import Error404 from "./pages/Error404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/support" element={<Support />} />
      <Route path="/error404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/error404" />} />
    </Routes>
  );
}

export default App;
