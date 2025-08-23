import { NavLink } from "react-router-dom"
import s from "./header.module.css"

export default function Header() {
  return (
    <header className={s.header}>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
