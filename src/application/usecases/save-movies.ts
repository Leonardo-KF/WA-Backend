import { Movie } from "../../domain/entities/movie.entity";

export interface SaveMovies {
  save(movies: Movie[]): Promise<void>;
}
