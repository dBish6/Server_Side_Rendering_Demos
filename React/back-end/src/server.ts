import express, { Request, Response } from "express";
import morgan from "morgan";

import fs from "fs/promises";
import path from "path";

import React from "react";
import ReactDOMserver from "react-dom/server";
import ReactApp from "../../front-end/src/App";

const app = express(),
  PORT = Number(process.env.HOST) || 4000;

app.use(express.static(path.resolve(__dirname, "../../front-end/build")));
app.use(morgan("dev"));

app.get("/*", async (req: Request, res: Response) => {
  console.log("req.url", req.url);
  console.log("req.headers", req.headers);
  console.log("PATH", path.resolve(__dirname, "../../front-end/build"));
  try {
    const data = await fs.readFile(
      path.resolve(__dirname, "../../front-end/build/index.html"),
      "utf-8"
    );
    console.log("data", data);
    const content = ReactDOMserver.renderToString(
      React.createElement(ReactApp)
    );
    content
      ? res.send(
          data.replace(
            `<div id="root"></div>`,
            `<div id="root">${content}</div>`
          )
        )
      : res.status(404).send("Contents of the React app was not found.");
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "Unexpected error serving initial index.html.",
      ERROR: error.message,
    });
  }
});

app.listen(PORT, "localhost", () =>
  console.log(
    `Server is running on ${process.env.PROTOCOL}${process.env.HOST}:${PORT}; Ctrl-C to terminate...`
  )
);
