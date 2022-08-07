import { Movie } from "@/domain/entities/movie.entity";
import { MovieValidation } from "@/presentation/validation/movie-validation";

export class MovieValidationPresentation implements MovieValidation {
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
