import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { SaveMoviesUseCase } from "@/data/usecases/save-movies.usecase";
import { MovieValidation } from "@/data/validation/movie-validation";
import { MockGetRequest } from "../requisitions/mockGetData";
import { UpdateMoviesController } from "@/main/presentation/controllers/update-movies-controller";

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
