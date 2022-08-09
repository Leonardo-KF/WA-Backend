import { MovieModel } from "../models/movie-model";

export interface IMoviesRepository {
  saveMovie(movie: MovieModel): Promise<void>;

  findMovies(skip: number, limit: number): Promise<MovieModel[]>;
}
