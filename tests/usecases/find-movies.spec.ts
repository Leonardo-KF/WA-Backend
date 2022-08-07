import { FindMovies } from "@/src/application/usecases/find-movies";
import { Movie } from "@/src/domain/entities/movie.entity";
import { IMoviesRepository } from "../../src/data/repositories/movies.repository";

class MoviesRepositorySpy implements IMoviesRepository {
  movies: Movie[] = [];

  findMovies(skip: number, limit: number): Promise<Movie[]> {
    const findedMovies = this.movies.slice(skip, limit);
    console.log(this.movies);
    return Promise.resolve(findedMovies);
  }

  saveMovie(movie: Movie): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

class FindMoviesUseCase implements FindMovies {
  constructor(private readonly moviesRepository: IMoviesRepository) {}
  async execution(page: number, limit: number): Promise<Movie[]> {
    const skipping = page * limit;

    const lastIndex = skipping + limit;
    const findedMovies = await this.moviesRepository.findMovies(
      skipping,
      lastIndex
    );
    return findedMovies;
  }
}

describe("findMoviesUseCase", () => {
  it("should return the limit movies per execution", async () => {
    const moviesRepository = new MoviesRepositorySpy();
    moviesRepository.movies = [
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
    const sut = new FindMoviesUseCase(moviesRepository);

    const limit = 2;
    const page = 1;
    const movieList = await sut.execution(page, limit);

    expect(movieList.length).toBe(limit);
  });
});
