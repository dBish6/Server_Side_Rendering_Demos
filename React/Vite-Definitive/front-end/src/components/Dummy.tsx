import { useState } from "react";

interface DummyProps {
  title: string;
};

export default function Dummy({ title }: DummyProps) {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/images/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite SSR + React: Definitive</h1>
      <h2>{title}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
