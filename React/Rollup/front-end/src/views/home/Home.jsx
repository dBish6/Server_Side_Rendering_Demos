import { useState } from "react";
import s from "./home.module.css"

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className={s.home}>
      <h1>Home</h1>

      <section>
        <h2>Lorem ipsum!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Click Me {!count ? "Please" : `${count} More Times`}
        </button>
      </section>
    </div>
  );
}
