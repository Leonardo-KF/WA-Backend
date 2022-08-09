import { HttpRequest } from "@/data/adapters/http-request";
import { SaveMovies } from "@/domain/usecases/save-movies";
import { Controller } from "@/presentation/controllers/Controller";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export class UpdateMoviesController implements Controller {
  constructor(
    private readonly httpRequest: HttpRequest,
    private readonly saveMovieUseCase: SaveMovies
  ) {}

  async route(): Promise<HttpResponse> {
    try {
      const movies = await this.httpRequest.get(
        "https://ghibliapi.herokuapp.com/films?fields=id,title,description,producer,director,movie_banner"
      );
      const savedMovies = await this.saveMovieUseCase.save(movies.body);
      return {
        statusCode: movies.statusCode,
        body: savedMovies,
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          message: error.message,
        },
      };
    }
  }
}
