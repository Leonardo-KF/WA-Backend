import { MovieModel } from "@/data/models/movie-model";
import { IMoviesRepository } from "@/data/repositories/movies.repository";

export class MoviesRepositorySpy implements IMoviesRepository {
  async countMovies(): Promise<number> {
    return this.movies.length;
  }
  movies: MovieModel[] = [];

  async findAndUpdateMovie(
    movieUpdated: MovieModel
  ): Promise<MovieModel | undefined> {
    let newMovie: MovieModel | undefined = undefined;
    this.movies.map((movie, index) => {
      if (movie.id === movieUpdated.id) {
        newMovie = movieUpdated;
        this.movies.splice(index, 1, newMovie);
      }
    });
    return newMovie;
  }

  async findMovies(skip: number, limit: number): Promise<MovieModel[]> {
    const findedMovies = this.movies.slice(skip, limit);
    return findedMovies;
  }

  async saveMovie(movie: MovieModel): Promise<MovieModel> {
    this.movies.push(movie);
    return movie;
  }
}
