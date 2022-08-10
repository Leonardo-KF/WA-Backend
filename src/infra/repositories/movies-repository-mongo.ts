import { MovieModel } from "@/data/models/movie-model";
import { IMoviesRepository } from "@/data/repositories/movies.repository";
import { MongoHelper } from "../helpers/mongo-helper";
import { ObjectId } from "mongodb";

export class MoviesRepositoryMongo implements IMoviesRepository {
  async findAndUpdateMovie(movie: MovieModel): Promise<MovieModel | undefined> {
    const moviesCollection = MongoHelper.getCollection("movies");
    const movieUpdateId = movie.id;
    const movieToUpdate = await moviesCollection.findOneAndUpdate(
      { id: movieUpdateId },
      { $set: movie }
    );

    const movieUpdated = MongoHelper.map(movieToUpdate);
    if (movieUpdated.value) {
      delete movieUpdated.value._id;
      return movieUpdated.value;
    } else {
      return undefined;
    }
  }

  async countMovies(): Promise<number> {
    const moviesCollection = MongoHelper.getCollection("movies");
    const count = await moviesCollection.countDocuments();
    return count;
  }

  async saveMovie(movie: MovieModel): Promise<MovieModel> {
    const moviesCollection = MongoHelper.getCollection("movies");
    const newMovie = await moviesCollection.insertOne(movie);
    const moviesSaved = MongoHelper.map(newMovie);
    if (moviesSaved.insertedId) {
      return movie;
    }
  }

  async findMovies(skip: number, limit: number): Promise<MovieModel[]> {
    const moviesCollection = MongoHelper.getCollection("movies");
    const movies = await moviesCollection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
    return MongoHelper.mapCollection(movies);
  }
}
