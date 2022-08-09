import { Movie } from "@/domain/entities/movie.entity";

export interface FindMovies {
  execution(page: number, limit: number): Promise<Movie[]>;
}
