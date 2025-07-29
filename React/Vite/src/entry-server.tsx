import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

export async function render({ path }: { path: string }) {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
};
