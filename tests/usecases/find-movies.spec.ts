import { FindMovies } from "@/src/application/usecases/find-movies";
import { Movie } from "@/src/domain/entities/movie.entity";
import { IMoviesRepository } from "../../src/data/repositories/movies.repository";

class MoviesRepositorySpy implements IMoviesRepository {
  saveMovie(movie: Movie): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

class FindMoviesUseCase implements FindMovies {
  constructor(private readonly moviesRepository: IMoviesRepository);
  execution(page: number): Promise<Movie[]> {
    throw new Error("Method not implemented.");
  }
}

describe("findMoviesUseCase", () => {
  it("should return 10 movies per execution", async () => {
    const moviesRepository = new MoviesRepositorySpy();
    const findMoviesUseCase = new FindMoviesUseCase(moviesRepository);

    const movieList = await findMoviesUseCase.execution(1);

    expect(movieList.lenght()).toEqual(10);
  });
});
