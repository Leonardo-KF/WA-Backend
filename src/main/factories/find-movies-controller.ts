import { FindMoviesUseCase } from "@/data/usecases/find-movies";
import { MoviesRepositoryInMemory } from "@/infra/repositories/movies-repository-in-memory";
import { MoviesRepositoryMongo } from "@/infra/repositories/movies-repository-mongo";
import { Controller } from "@/presentation/controllers/controller";
import { GetMoviesController } from "../presentation/controllers/get-movies-controller";

export const makeFindMoviesController = (): Controller => {
  const repository = new MoviesRepositoryMongo();
  const findMoviesUseCase = new FindMoviesUseCase(repository);
  return new GetMoviesController(findMoviesUseCase);
};
