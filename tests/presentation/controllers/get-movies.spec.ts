import { FindMovies } from "@/domain/usecases/find-movies";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { FindMoviesUseCase } from "@/data/usecases/find-movies";
import { faker } from "@faker-js/faker";
import { GetMoviesController } from "@/main/presentation/controllers/get-movies-controller";

const MakeSut = (): {
  sut: GetMoviesController;
  findMoviesUseCase: FindMovies;
  moviesRepositorySpy: MoviesRepositorySpy;
} => {
  const moviesRepositorySpy = new MoviesRepositorySpy();
  const findMoviesUseCase = new FindMoviesUseCase(moviesRepositorySpy);
  const sut = new GetMoviesController(findMoviesUseCase);

  for (let i = 0; i < 15; i++) {
    const movie = {
      id: faker.random.alphaNumeric(10),
      title: faker.name.jobTitle(),
      banner: faker.image.imageUrl(),
      description: faker.lorem.paragraph(),
      director: faker.name.firstName(),
      producer: faker.name.firstName(),
    };
    moviesRepositorySpy.movies.push(movie);
  }

  return {
    sut,
    findMoviesUseCase,
    moviesRepositorySpy,
  };
};

describe("GetMoviesRoute", () => {
  it("should return max 10 movies per page request", async () => {
    const { sut } = MakeSut();

    const response = await sut.route({ params: "1", body: "" });

    expect(response.body.length).toBe(10);
  });
  it("should return max of movies if not have 10 movies in page", async () => {
    const { sut } = MakeSut();

    const response = await sut.route({ params: "2", body: "" });

    expect(response.body.length).toBe(5);
  });
});
