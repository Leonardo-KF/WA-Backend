import { FindMovies } from "@/domain/usecases/find-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { MovieModel } from "@/data/models/movie-model";

export class FindMoviesUseCase implements FindMovies {
  constructor(private readonly moviesRepository: IMoviesRepository) {}
  async execution(page: number, limit: number): Promise<MovieModel[]> {
    const skipping = (page - 1) * limit;

    const lastIndex = skipping + limit;
    const findedMovies = await this.moviesRepository.findMovies(
      skipping,
      lastIndex
    );
    return findedMovies;
  }
}
