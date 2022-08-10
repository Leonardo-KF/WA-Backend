import { Movie } from "@/domain/entities/movie.entity";

export interface IMoviesValidation {
  validate(movie: Movie[]): Promise<Movie[]>;
}
