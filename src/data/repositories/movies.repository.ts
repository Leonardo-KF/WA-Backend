import { Movie } from "../../domain/entities/movie.entity";

export interface IMoviesRepository {
  saveMovie(movie: Movie): Promise<void>;
}
