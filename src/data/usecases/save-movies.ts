import { SaveMovies } from "@/domain/usecases/save-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { MovieModel } from "@/data/models/movie-model";

export class SaveMoviesUseCase implements SaveMovies {
  constructor(private readonly repository: IMoviesRepository) {}

  async save(movies: MovieModel[]): Promise<MovieModel[]> {
    const newMovies: MovieModel[] = [];
    movies.map(async (movie) => {
      let savedMovie: MovieModel;
      savedMovie = await this.repository.findAndUpdateMovie(movie);
      if (!savedMovie) {
        savedMovie = await this.repository.saveMovie(movie);
      }
      newMovies.push(savedMovie);
    });
    return newMovies;
  }
}
