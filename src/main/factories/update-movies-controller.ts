import { SaveMoviesUseCase } from "@/data/usecases/save-movies";
import { MoviesValidation } from "@/data/validation/movie-validation";
import { MoviesRepositoryMongo } from "@/infra/repositories/movies-repository-mongo";
import { Controller } from "@/presentation/controllers/Controller";
import { UpdateMoviesController } from "../presentation/controllers/update-movies-controller";
import { GetRequest } from "../../infra/external/get-movies";

export const makeUpdateMoviesController = (): Controller => {
  const moviesRepository = new MoviesRepositoryMongo();
  const moviesValidation = new MoviesValidation();
  const saveMoviesUseCase = new SaveMoviesUseCase(moviesRepository);
  const getRequest = new GetRequest();
  return new UpdateMoviesController(
    getRequest,
    saveMoviesUseCase,
    moviesValidation
  );
};
