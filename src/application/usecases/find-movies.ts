import { Movie } from "@/src/domain/entities/movie.entity";

export interface FindMovies {
  execution(page: number): Promise<Movie[]>;
}
