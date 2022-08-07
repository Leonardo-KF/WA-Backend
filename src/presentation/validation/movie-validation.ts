import { Movie } from "@/domain/entities/movie.entity";

export interface MovieValidation {
  validate(movie: Movie): Promise<Movie>;
}
