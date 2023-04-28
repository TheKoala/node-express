import express from "express";
import livro from "./livroRoute.js";
import autor from "./autorRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("Hello Express");
  });

  app.use(express.json(), livro, autor);
};

export default routes;
