import express from "express";
import livro from "./livroRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Hello Express");
  });

  app.use(express.json(), livro);
};

export default routes;