import { Movie } from "../../domain/entities/movie.entity";

export interface IMoviesRepository {
  saveMovie(movie: Movie): Promise<void>;

  findMovies(skip: number, limit: number): Promise<Movie[]>;
}
