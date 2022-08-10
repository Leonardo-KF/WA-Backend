import { Movie } from "@/domain/entities/movie.entity";
import { IMoviesValidation } from "@/domain/validation/movie-validation";

export class MoviesValidation implements IMoviesValidation {
  async validate(movies: Movie[]): Promise<Movie[]> {
    return movies.map((movie) => {
      if (
        !movie.id ||
        !movie.title ||
        !movie.banner ||
        !movie.description ||
        !movie.director ||
        !movie.producer
      ) {
        throw new Error("Movie is invalid");
      } else {
        return movie;
      }
    });
  }
}
