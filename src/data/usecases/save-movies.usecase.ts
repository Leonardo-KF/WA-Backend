import { SaveMovies } from "@/domain/usecases/save-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { Movie } from "@/domain/entities/movie.entity";

export class SaveMoviesUseCase implements SaveMovies {
  constructor(private readonly repository: IMoviesRepository) {}

  async save(movies: Movie[]): Promise<void> {
    movies.map(async (movie) => {
      await this.repository.saveMovie(movie);
    });
  }
}
