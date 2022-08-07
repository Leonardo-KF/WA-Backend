import { HttpRequest } from "@/application/adapters/http-request";
import { MoviesRepositorySpy } from "@/main/data/repositories/movies-in-memory.repository";
import { HttpResponse } from "../protocols/httpResponse";
import { UpdateMoviesRoute } from "./update-movies";
import { faker } from "@faker-js/faker";
import { SaveMovies } from "@/application/usecases/save-movies";
import { SaveMoviesUseCase } from "@/main/usecases/save-movies.usecase";

class UpdateMoviesController implements UpdateMoviesRoute {
  constructor(
    private readonly httpRequest: HttpRequest,
    private readonly saveMovieUseCase: SaveMovies
  ) {}

  async route(): Promise<HttpResponse> {
    const movies = await this.httpRequest.get("any_url");
    await this.saveMovieUseCase.save(movies.body);

    return {
      statusCode: 200,
      body: {
        message: "success",
      },
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
  const saveMovieUseCase = new SaveMoviesUseCase(moviesRepository);
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
