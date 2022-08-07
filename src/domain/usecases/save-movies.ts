import { Movie } from "../entities/movie.entity";

export interface SaveMovies {
  save(movies: Movie[]): Promise<void>;
}
