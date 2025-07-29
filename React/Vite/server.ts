import type { Request as ERequest, Response as EResponse } from "express";
import type { ViteDevServer } from "vite"; 

import { readFile } from "fs/promises";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import morgan from "morgan";
import sirv from "sirv";
import rateLimit from "express-rate-limit";

import { routes } from "./src/routes";

const { PROTOCOL, HOST, PORT: ENV_PORT } = process.env,
  PORT = Number(ENV_PORT) || 3000;

const _dirname = dirname(fileURLToPath(import.meta.url));

async function setupServer() {
  const app = express();
  let vite: ViteDevServer | undefined;

  app.disable("x-powered-by");

  if (process.env.NODE_ENV === "development") {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom"
    });

    app.use(vite.middlewares);
    app.use(morgan("dev"));
  } else {
    app.use(sirv(join(_dirname, "public"), { gzip: true }));
    app.use(morgan("combined"));
  }

  app.use(
    rateLimit({
      windowMs: 10 * 1000, // 10 seconds
      max: 5, // limits each IP to 5 requests per windowMs.
      handler: (_: ERequest, res: EResponse) => 
        res.status(429).send(
          "Too many requests made from this IP, please try again later."
        )
    })
  );

  app.use((req, res, next) => {
    if (req.method !== "GET") {
      // Must be a get request.
      return res.status(403).send("Access Denied");
    } else if (!req.accepts("html")) {
      // Must accept html.
      return res.status(406).send("Not Acceptable");
    } else if (req.path === "/") {
      return res.redirect(301, "/home");
    }
    
    next();
  });

  app.use("/*", async (req, res, next) => {
    try {
      let template, render;

      if (process.env.NODE_ENV === "development") {
        const [entry, indexHTML] = await Promise.all([
          vite!.ssrLoadModule("./src/entry-server.tsx"), // Makes it compatible with vite ssr in dev and hmr, etc.
          vite!.transformIndexHtml(req.originalUrl, readFileSync("index.html", "utf-8"))
        ]);
        render = entry.render;
        template = indexHTML;
      } else {
        const [entry, indexHTML] = await Promise.all([
          import("./src/entry-server"),
          readFile(join(_dirname, "./public/index.html"), "utf-8")
        ]);
        render = entry.render;
        template = indexHTML;
      }
      const pageExists = routes[req.path as keyof typeof routes];

      const appHtml = await render({ path: pageExists ? req.originalUrl : "/error-404" }),
        html = template.replace("<!--ssr-outlet-->", appHtml);

      return res.status(pageExists ? 200 : 404).send(html);
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        vite!.ssrFixStacktrace(error);
        if (!res.headersSent) next(error);
      } else {
        next(error);
      }
    }
  });

  return app;
};

setupServer().then((app) =>
  app.listen(PORT, HOST!, () =>
    console.log(
      `Server is running on ${PROTOCOL}${HOST}:${PORT}; Ctrl-C to terminate...`
    )
  )
);
