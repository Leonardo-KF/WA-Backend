import { FindMoviesUseCase } from "@/data/usecases/find-movies.usecase";
import { Controller } from "@/presentation/controllers/controller";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { GetMoviesController } from "../presentation/controllers/get-movies-controller";

export const makeFindMoviesController = (): Controller => {
  const repository = new MoviesRepositorySpy();
  const findMoviesUseCase = new FindMoviesUseCase(repository);
  return new GetMoviesController(findMoviesUseCase);
};
