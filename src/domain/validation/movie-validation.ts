import { Movie } from "@/domain/entities/movie.entity";

export interface IMovieValidation {
  validate(movie: Movie): Promise<Movie>;
}
