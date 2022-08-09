import { FindMovies } from "@/domain/usecases/find-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { FindMoviesUseCase } from "@/data/usecases/find-movies.usecase";

const MakeSut = (): {
  sut: FindMovies;
  moviesRepositorySpy: IMoviesRepository;
} => {
  const moviesRepositorySpy = new MoviesRepositorySpy();
  moviesRepositorySpy.movies = [
    {
      banner: "test",
      description: "test description",
      director: "test director",
      id: "1",
      producer: "test producer",
      title: "test title",
    },
    {
      banner: "test",
      description: "test description",
      director: "test director",
      id: "2",
      producer: "test producer",
      title: "test title",
    },
    {
      banner: "test",
      description: "test description",
      director: "test director",
      id: "3",
      producer: "test producer",
      title: "test title",
    },
    {
      banner: "test",
      description: "test description",
      director: "test director",
      id: "4",
      producer: "test producer",
      title: "test title",
    },
    {
      banner: "test",
      description: "test description",
      director: "test director",
      id: "5",
      producer: "test producer",
      title: "test title",
    },
    {
      banner: "test",
      description: "test description",
      director: "test director",
      id: "6",
      producer: "test producer",
      title: "test title",
    },
  ];
  const sut = new FindMoviesUseCase(moviesRepositorySpy);
  return { sut, moviesRepositorySpy };
};

describe("findMoviesUseCase", () => {
  it("should return the limit movies per execution", async () => {
    const { sut } = MakeSut();

    const limit = 2;
    const page = 1;
    const movieList = await sut.execution(page, limit);

    expect(movieList.length).toBe(limit);
  });
  it("should return the max number of movies if not have the limit in page", async () => {
    const { sut } = MakeSut();

    const limit = 4;
    const page = 2;
    const movieList = await sut.execution(page, limit);

    expect(movieList.length).toBe(2);
  });
  it("should return the clean array if not have movies in page", async () => {
    const { sut } = MakeSut();

    const limit = 4;
    const page = 3;
    const movieList = await sut.execution(page, limit);

    expect(movieList.length).toBe(0);
  });
});
