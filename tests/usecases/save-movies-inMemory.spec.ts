import { Movie } from "../../src/domain/entities/movie.entity";
import { SaveMovies } from "../../src/application/usecases/save-movies";
import { IMoviesRepository } from "../../src/data/repositories/movies.repository";

class SaveMoviesUseCase implements SaveMovies {
  constructor(private readonly repository: IMoviesRepository) {}

  async save(movies: Movie[]): Promise<void> {
    movies.map(async (movie) => {
      await this.repository.saveMovie(movie);
    });
  }
}

class MoviesRepository implements IMoviesRepository {
  movies: Movie[] = [];

  async saveMovie(movie: Movie): Promise<void> {
    this.movies.push(movie);
  }
}

describe("SaveMoviesUseCase", () => {
  it("should save a movie list", async () => {
    const moviesRepository = new MoviesRepository();
    const sut = new SaveMoviesUseCase(moviesRepository);

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

    expect(moviesRepository.movies).toContain(movies[0]);
    expect(moviesRepository.movies).toContain(movies[1]);
  });
});
