import { HttpRequest } from "@/data/adapters/http-request";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { HttpResponse } from "../protocols/httpResponse";
import { faker } from "@faker-js/faker";
import { SaveMovies } from "@/domain/usecases/save-movies";
import { SaveMoviesUseCase } from "@/data/usecases/save-movies.usecase";
import { UpdateMoviesRoute } from "./update-movies";
import { MovieValidation } from "@/data/validation/movie-validation";

class UpdateMoviesController implements UpdateMoviesRoute {
  constructor(
    private readonly httpRequest: HttpRequest,
    private readonly saveMovieUseCase: SaveMovies
  ) {}

  async route(): Promise<HttpResponse> {
    const movies = await this.httpRequest.get("any_url");
    await this.saveMovieUseCase.save(movies.body);

    return {
      statusCode: movies.statusCode,
      body: "",
    };
  }
}

class Request implements HttpRequest {
  movies = [];
  async get(url: string): Promise<HttpResponse> {
    const newMovies = [];
    for (let i = 0; i < 20; i++) {
      const movie = {
        id: faker.random.alphaNumeric(10),
        title: faker.name.jobTitle(),
        banner: faker.image.imageUrl(),
        description: faker.lorem.paragraph(),
        director: faker.name.firstName(),
        producer: faker.name.firstName(),
      };
      newMovies.push(movie);
    }

    this.movies = newMovies;
    return {
      statusCode: 200,
      body: newMovies,
    };
  }
}

const MakeSut = (): {
  sut: UpdateMoviesController;
  moviesRepository: MoviesRepositorySpy;
  request: Request;
} => {
  const moviesRepository = new MoviesRepositorySpy();
  const request = new Request();
  const movieValidation = new MovieValidation();
  const saveMovieUseCase = new SaveMoviesUseCase(
    moviesRepository,
    movieValidation
  );
  const sut = new UpdateMoviesController(request, saveMovieUseCase);

  return {
    sut,
    moviesRepository,
    request,
  };
};

describe("UpdateMoviesRoute", () => {
  it("should update movies", async () => {
    const { sut } = MakeSut();
    const response = await sut.route();

    expect(response.statusCode).toBe(200);
  });
  it("should add a new movie if it doesn't exist", async () => {
    const { sut, moviesRepository, request } = MakeSut();

    await sut.route();

    expect(moviesRepository.movies).toContain(request.movies[10]);
  });
});
