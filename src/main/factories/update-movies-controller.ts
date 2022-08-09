import { SaveMoviesUseCase } from "@/data/usecases/save-movies.usecase";
import { MovieValidation } from "@/data/validation/movie-validation";
import { Controller } from "@/presentation/controllers/Controller";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { UpdateMoviesController } from "../presentation/controllers/update-movies-controller";
import { GetRequest } from "../presentation/external/get-movies";

export const makeUpdateMoviesController = (): Controller => {
  const moviesRepository = new MoviesRepositorySpy();
  const movieValidation = new MovieValidation();
  const saveMoviesUseCase = new SaveMoviesUseCase(
    moviesRepository,
    movieValidation
  );
  const getRequest = new GetRequest();
  return new UpdateMoviesController(getRequest, saveMoviesUseCase);
};
