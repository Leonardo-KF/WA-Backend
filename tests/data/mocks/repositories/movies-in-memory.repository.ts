import { MovieModel } from "@/data/models/movie-model";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { Movie } from "@/domain/entities/movie.entity";

export class MoviesRepositorySpy implements IMoviesRepository {
  movies: MovieModel[] = [];

  async findAndUpdateMovie(movieUpdated: Movie): Promise<Movie | undefined> {
    let newMovie: Movie;
    this.movies.map((movie, index) => {
      if (movie.id === movieUpdated.id) {
        newMovie = movieUpdated;
        this.movies[index] = newMovie;
      }
    });
    return newMovie;
  }

  async findMovies(skip: number, limit: number): Promise<MovieModel[]> {
    const findedMovies = this.movies.slice(skip, limit);
    return findedMovies;
  }

  async saveMovie(movie: MovieModel): Promise<void> {
    this.movies.push(movie);
  }
}
