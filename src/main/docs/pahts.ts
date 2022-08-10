import { findMoviePath } from "./paths/find-movies";
import { updateMoviesPath } from "./paths/update-movies";

export default {
  "/find/page/{id}": findMoviePath,
  "/update": updateMoviesPath,
};
