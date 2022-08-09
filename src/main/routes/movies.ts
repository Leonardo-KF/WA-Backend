import { Router } from "express";
import { adaptRoute } from "../adapters/express-router";
import { makeFindMoviesController } from "../factories/find-movies-controller";
import { makeUpdateMoviesController } from "../factories/update-movies-controller";

export default (router: Router): void => {
  router.get("/find/page/:id", adaptRoute(makeFindMoviesController()));
  router.get("/update", adaptRoute(makeUpdateMoviesController()));
};
