import { MovieModel } from "../models/movie-model";

export interface IMoviesRepository {
  findAndUpdateMovie(movie: MovieModel): Promise<MovieModel>;

  saveMovie(movie: MovieModel): Promise<MovieModel>;

  findMovies(skip: number, limit: number): Promise<MovieModel[]>;
}
