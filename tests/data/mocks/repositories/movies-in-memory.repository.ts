import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { Movie } from "@/domain/entities/movie.entity";

export class MoviesRepositorySpy implements IMoviesRepository {
  movies: Movie[] = [];

  findMovies(skip: number, limit: number): Promise<Movie[]> {
    const findedMovies = this.movies.slice(skip, limit);
    return Promise.resolve(findedMovies);
  }

  async saveMovie(movie: Movie): Promise<void> {
    this.movies.push(movie);
  }
}
