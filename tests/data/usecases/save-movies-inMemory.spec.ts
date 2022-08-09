import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { MovieValidation } from "@/data/validation/movie-validation";
import { SaveMoviesUseCase } from "@/data/usecases/save-movies";

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
    const { sut, moviesRepositorySpy } = MakeSut();

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
    const newMovies = await sut.save(movies);

    console.log("repository", newMovies);

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
