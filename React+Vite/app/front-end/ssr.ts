// @Author David Bishop
// @Reference https://vitejs.dev/guide/ssr.html

import fs from "fs";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { createServer as createViteServer, ViteDevServer } from "vite";
import sirv from "sirv";

const createServer = async () => {
  const app = express();
  dotenv.config();
  const PORT = Number(process.env.HOST) || 3000;
  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so the parent server
  // can take control
  let vite: ViteDevServer;
  if (process.env.NODE_ENV === "development") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    app.use(vite.middlewares);
  } else {
    // Instead of express.static, use sirv.
    app.use(
      sirv("build/client", {
        gzip: true,
      })
    );
  }

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    console.log("url", url);
    try {
      let template, render;

      // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
      // 1. Read index.html
      if (process.env.NODE_ENV === "development") {
        template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
        console.log("template", template);

        // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
        //    and also applies HTML transforms from Vite plugins, if any.
        template = await vite.transformIndexHtml(url, template);

        // 3. Load the server entry. ssrLoadModule automatically transforms
        //    ESM source code to be usable in Node.js.
        // @ts-ignore
        render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
      } else {
        template = fs.readFileSync(
          path.resolve("./build/client/index.html"),
          "utf-8"
        );
        // @ts-ignore
        render = (await import("./build/ssr/entry-server")).render;
      }

      // 4. Render the app HTML.
      const appHtml = await render({ path: url });
      // console.log("appHtml", appHtml);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
      next();
    } catch (error: any) {
      // If an error is caught, let Vite fix the stack trace.
      process.env.NODE_ENV === "development" && vite.ssrFixStacktrace(error);
      next(error);
    }
  });

  app.listen(PORT, "localhost", () =>
    console.log(
      `Server is running on ${process.env.PROTOCOL}${process.env.HOST}:${PORT}; Ctrl-C to terminate...`
    )
  );
};

createServer();
