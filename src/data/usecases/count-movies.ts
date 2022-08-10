import { CountMovies } from "@/domain/usecases/count-movies";
import { IMoviesRepository } from "../repositories/movies.repository";

export class CountMoviesUseCase implements CountMovies {
  constructor(private readonly moviesRepository: IMoviesRepository) {}
  async execution(): Promise<number> {
    const count = await this.moviesRepository.countMovies();
    return count;
  }
}
