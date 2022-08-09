import { Movie } from "@/domain/entities/movie.entity";
import { IMovieValidation } from "@/domain/validation/movie-validation";

export class MovieValidation implements IMovieValidation {
  async validate(movie: Movie): Promise<Movie> {
    if (
      !movie.id ||
      !movie.title ||
      !movie.banner ||
      !movie.description ||
      !movie.director ||
      !movie.producer
    ) {
      throw new Error("Movie is invalid");
    }

    return movie;
  }
}
