import { FindMoviesUseCase } from "@/data/usecases/find-movies";
import { MoviesRepositoryInMemory } from "@/infra/repositories/movies-repository-in-memory";
import { Controller } from "@/presentation/controllers/controller";
import { GetMoviesController } from "../presentation/controllers/get-movies-controller";

export const makeFindMoviesController = (): Controller => {
  const repository = new MoviesRepositoryInMemory();
  const findMoviesUseCase = new FindMoviesUseCase(repository);
  return new GetMoviesController(findMoviesUseCase);
};
