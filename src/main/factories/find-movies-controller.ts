import { CountMoviesUseCase } from "@/data/usecases/count-movies";
import { FindMoviesUseCase } from "@/data/usecases/find-movies";
import { MoviesRepositoryMongo } from "@/infra/repositories/movies-repository-mongo";
import { Controller } from "../../presentation/controllers/controller";
import { GetMoviesController } from "../presentation/controllers/get-movies-controller";

export const makeFindMoviesController = (): Controller => {
  const repository = new MoviesRepositoryMongo();
  const findMoviesUseCase = new FindMoviesUseCase(repository);
  const countMovies = new CountMoviesUseCase(repository);
  return new GetMoviesController(findMoviesUseCase, countMovies);
};
