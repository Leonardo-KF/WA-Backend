import { SaveMovies } from "@/application/usecases/save-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { Movie } from "@/domain/entities/movie.entity";
import { MoviesRepositorySpy } from "@/main/data/repositories/movies-in-memory.repository";

class SaveMoviesUseCase implements SaveMovies {
  constructor(private readonly repository: IMoviesRepository) {}

  async save(movies: Movie[]): Promise<void> {
    movies.map(async (movie) => {
      await this.repository.saveMovie(movie);
    });
  }
}

describe("SaveMoviesUseCase", () => {
  it("should save a movie list", async () => {
    const moviesRepository = new MoviesRepositorySpy();
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
