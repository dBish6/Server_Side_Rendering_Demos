import { static as static_ } from "express";

import { readFileSync } from "fs";
import { join } from "path";

import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import App from "../../../front-end/src/App";

function render(location) {
  const appHtml = renderToString(
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    ),
    template = readFileSync(
      join(
        process.cwd(),
        `${process.env.NODE_ENV === "development" ? ".." : ""}/build/public/index.html`
      ),
      "utf-8"
    );
  
  return template.replace("<!--ssr-outlet-->", appHtml);
}

export default function setupSSR(app) {
  app.use("/public",
    static_(
      join(process.cwd(), `${process.env.NODE_ENV === "development" ? ".." : ""}/build/public`)
    )
  );

  app.get("/*", async (req, res) => {
    // TODO: If page doesn't exist.

    const html = render(req.originalUrl);
    return res.status(200).setHeader("Content-Type", "text/html").end(html);
  });
}
