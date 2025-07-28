import type { Express, Response as EResponse } from "express";
import type { ViteDevServer } from "vite"; 

import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

import sirv from "sirv";

import SRC_DIRECTORY from "@constants/SRC_DIRECTORY";

export async function initSsr(app: Express) {
  let vite: ViteDevServer | undefined;

  if (process.env.NODE_ENV === "development") {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      root: path.join(SRC_DIRECTORY, "../../front-end")
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      sirv(path.join(SRC_DIRECTORY, "public"), { gzip: true })
    );
  }

  return vite;
}

export function handleSsr(app: Express, vite?: ViteDevServer) {
  app.get(/^\/(?!api\/).*/, async (req, res, next) => {
    const url = req.originalUrl;

    if (!req.accepts("html")) return next();

    try {
      let template, render;

      if (process.env.NODE_ENV === "development") {
        template = await vite!.transformIndexHtml(
          url,
          readFileSync(path.join(SRC_DIRECTORY, "../../front-end/index.html"), "utf-8")
        );
        // console.log("template", template);
        render = (await vite!.ssrLoadModule("./src/entry-server")).render;
      } else {
        const [indexHTML, entry] = await Promise.all([
          readFile(path.join(SRC_DIRECTORY, "./public/index.html"), "utf-8"),
          // @ts-ignore
          import("../../front-end/src/entry-server")
        ]);
        template = indexHTML;
        render = entry.render;
      }

      try {
        const appHtml = await render(req, res),
          html = template.replace("<!--ssr-outlet-->", appHtml)
          // console.log("appHtml", appHtml);
          // console.log("html", html);

        return res.status(200).setHeader("Content-Type", "text/html").end(html);
      } catch (error) {
        redirect(res, error)
        throw error;
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        vite!.ssrFixStacktrace(error);
        if (!res.headersSent) next(error);
      } else {
        next(error);
      }
    }
  });

  const redirect = (res: EResponse, error: any) => {
    if ("statusCode" in error && "location" in error) {
      if (error.statusCode === 404) return res.redirect("/error-404");
      else if (error.location.pathname === "/") return res.redirect("/home");
      
    } else if (
      error instanceof Response &&
      error.status >= 300 &&
      error.status <= 399
    ) {
      return res.redirect(
        error.status,
        error.headers.get("Location") || ""
      );
    }
  }
}
