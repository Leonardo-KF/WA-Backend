import { SaveMoviesUseCase } from "@/data/usecases/save-movies";
import { MovieValidation } from "@/data/validation/movie-validation";
import { MoviesRepositoryInMemory } from "@/infra/repositories/movies-repository-in-memory";
import { Controller } from "@/presentation/controllers/Controller";
import { UpdateMoviesController } from "../presentation/controllers/update-movies-controller";
import { GetRequest } from "../presentation/external/get-movies";

export const makeUpdateMoviesController = (): Controller => {
  const moviesRepository = new MoviesRepositoryInMemory();
  const movieValidation = new MovieValidation();
  const saveMoviesUseCase = new SaveMoviesUseCase(
    moviesRepository,
    movieValidation
  );
  const getRequest = new GetRequest();
  return new UpdateMoviesController(getRequest, saveMoviesUseCase);
};
