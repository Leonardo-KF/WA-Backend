import { HttpRequest } from "@/data/adapters/http-request";
import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { HttpResponse } from "@/presentation/protocols/httpResponse";
import { SaveMovies } from "@/domain/usecases/save-movies";
import { SaveMoviesUseCase } from "@/data/usecases/save-movies.usecase";
import { UpdateMoviesRoute } from "@/presentation/controllers/update-movies";
import { MovieValidation } from "@/data/validation/movie-validation";
import { MockGetRequest } from "../requisitions/mockGetData";

class UpdateMoviesController implements UpdateMoviesRoute {
  constructor(
    private readonly httpRequest: HttpRequest,
    private readonly saveMovieUseCase: SaveMovies
  ) {}

  async route(): Promise<HttpResponse> {
    try {
      const movies = await this.httpRequest.get("any_url");
      const savedMovies = await this.saveMovieUseCase.save(movies.body);
      return {
        statusCode: movies.statusCode,
        body: savedMovies,
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          message: error.message,
        },
      };
    }
  }
}

const MakeSut = (): {
  sut: UpdateMoviesController;
  moviesRepository: MoviesRepositorySpy;
  request: MockGetRequest;
} => {
  const moviesRepository = new MoviesRepositorySpy();
  const request = new MockGetRequest();
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
