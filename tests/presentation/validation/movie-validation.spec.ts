import { Movie } from "@/domain/entities/movie.entity";
import { MovieValidation } from "./movie-validation";

class MovieValidationPresentation implements MovieValidation {
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

describe("MovieValidation", () => {
  it("should return a movie if it is valid", async () => {
    const movie = {
      id: "1",
      title: "teste film",
      banner: "teste",
      description: "teste",
      director: "teste",
      producer: "teste",
    };
    const sut = new MovieValidationPresentation();
    const validation = await sut.validate(movie);
    expect(validation).toBe(movie);
  });
  it("should throw an error if movie is invalid", async () => {
    const movie = {
      id: "1",
      title: "teste film",
      banner: "teste",
      description: "teste",
      director: undefined,
      producer: "",
    };
    const sut = new MovieValidationPresentation();
    const validation = sut.validate(movie);
    await expect(validation).rejects.toThrowError("Movie is invalid");
  });
});
