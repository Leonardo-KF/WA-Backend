import { Movie } from "@/domain/entities/movie.entity";

export interface GetMovies {
  getMovies(): Promise<Movie[]>;
}
