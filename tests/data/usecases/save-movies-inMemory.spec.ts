import { SaveMovies } from "@/domain/usecases/save-movies";
import { IMovieValidation } from "@/domain/validation/movie-validation";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { MovieModel } from "@/data/models/movie-model";
import { MovieValidation } from "@/data/validation/movie-validation";
class SaveMoviesUseCase implements SaveMovies {
  constructor(
    private readonly repository: IMoviesRepository,
    private readonly movieValidation: IMovieValidation
  ) {}

  async save(movies: MovieModel[]): Promise<void> {
    movies.map(async (movie) => {
      await this.movieValidation.validate(movie);
      const movieUpdated = await this.repository.findAndUpdateMovie(movie);
      if (!movieUpdated) {
        await this.repository.saveMovie(movie);
      }
    });
  }
}

const MakeSut = (): {
  sut: SaveMoviesUseCase;
  moviesRepositorySpy: MoviesRepositorySpy;
} => {
  const moviesRepositorySpy = new MoviesRepositorySpy();
  const movieValidation = new MovieValidation();
  const sut = new SaveMoviesUseCase(moviesRepositorySpy, movieValidation);
  return {
    sut,
    moviesRepositorySpy,
  };
};

describe("SaveMoviesUseCase", () => {
  it("should save a movie list", async () => {
    const moviesRepositorySpy = new MoviesRepositorySpy();
    const movieValidation = new MovieValidation();
    const sut = new SaveMoviesUseCase(moviesRepositorySpy, movieValidation);

    const movies = [
      {
        id: "1",
        title: "teste film",
        banner: "teste",
        description: "teste",
        director: "teste",
        producer: "teste",
      },
      {
        id: "2",
        title: "test2 film",
        banner: "test2",
        description: "test2",
        director: "test2",
        producer: "test2",
      },
    ];
    await sut.save(movies);
    console.log(moviesRepositorySpy.movies);

    expect(moviesRepositorySpy.movies).toContainEqual(movies[0]);
    expect(moviesRepositorySpy.movies).toContainEqual(movies[1]);
  });
  it("should update movie if movie is in repository", async () => {
    const { sut, moviesRepositorySpy } = MakeSut();

    const movie = {
      id: "1",
      title: "teste film",
      banner: "teste",
      description: "teste",
      director: "teste",
      producer: "teste",
    };
    await sut.save([movie]);

    const movieUpdated = {
      id: "1",
      title: "teste film updated",
      banner: "teste",
      description: "teste",
      director: "teste",
      producer: "teste",
    };
    await sut.save([movieUpdated]);

    expect(moviesRepositorySpy.movies[0]).toEqual(movieUpdated);
  });
});
