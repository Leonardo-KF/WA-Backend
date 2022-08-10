import { MoviesRepositorySpy } from "@/tests/data/mocks/repositories/movies-in-memory.repository";
import { SaveMoviesUseCase } from "@/data/usecases/save-movies";
import { MoviesValidation } from "@/data/validation/movie-validation";
import { MockGetRequest } from "../requisitions/mockGetData";
import { UpdateMoviesController } from "@/main/presentation/controllers/update-movies-controller";

const MakeSut = (): {
  sut: UpdateMoviesController;
  moviesRepository: MoviesRepositorySpy;
  request: MockGetRequest;
} => {
  const moviesRepository = new MoviesRepositorySpy();
  const request = new MockGetRequest();
  const moviesValidation = new MoviesValidation();
  const saveMovieUseCase = new SaveMoviesUseCase(moviesRepository);
  const sut = new UpdateMoviesController(
    request,
    saveMovieUseCase,
    moviesValidation
  );

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
  it("should be return bad request if a movie not valid in the request", async () => {
    const { sut, request } = MakeSut();

    request.movies.push({
      id: "1",
      title: "teste film",
    });
    const response = await sut.route();

    expect(response.statusCode).toBe(400);
  });
});
