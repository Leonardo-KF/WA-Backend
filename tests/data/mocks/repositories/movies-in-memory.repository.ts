import { MovieModel } from "@/data/models/movie-model";
import { IMoviesRepository } from "@/data/repositories/movies.repository";

export class MoviesRepositorySpy implements IMoviesRepository {
  movies: MovieModel[] = [];

  findMovies(skip: number, limit: number): Promise<MovieModel[]> {
    const findedMovies = this.movies.slice(skip, limit);
    return Promise.resolve(findedMovies);
  }

  async saveMovie(movie: MovieModel): Promise<void> {
    this.movies.push(movie);
  }
}
