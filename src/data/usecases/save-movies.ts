import { SaveMovies } from "@/domain/usecases/save-movies";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { MovieModel } from "@/data/models/movie-model";
import { promisify } from "util";

export class SaveMoviesUseCase implements SaveMovies {
  constructor(private readonly repository: IMoviesRepository) {}

  save(movies: MovieModel[]): Promise<MovieModel[]> {
    const newMovies = movies.map(async (movie): Promise<MovieModel> => {
      let savedMovie = await this.repository.findAndUpdateMovie(movie);
      if (!savedMovie) {
        savedMovie = await this.repository.saveMovie(movie);
      }
      return savedMovie;
    });

    return Promise.all(newMovies);
  }
}
