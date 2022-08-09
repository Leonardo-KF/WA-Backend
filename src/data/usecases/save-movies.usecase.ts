import { SaveMovies } from "@/domain/usecases/save-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { IMovieValidation } from "@/domain/validation/movie-validation";
import { MovieModel } from "@/data/models/movie-model";

export class SaveMoviesUseCase implements SaveMovies {
  constructor(
    private readonly repository: IMoviesRepository,
    private readonly movieValidation: IMovieValidation
  ) {}

  async save(movies: MovieModel[]): Promise<MovieModel[]> {
    const newMovies: MovieModel[] = [];
    await movies.map(async (movie) => {
      await this.movieValidation.validate(movie);
      let savedMovie: MovieModel;
      savedMovie = await this.repository.findAndUpdateMovie(movie);
      if (!savedMovie) {
        console.log("movie create");
        savedMovie = await this.repository.saveMovie(movie);
      }
      newMovies.push(savedMovie);
    });
    return newMovies;
  }
}
