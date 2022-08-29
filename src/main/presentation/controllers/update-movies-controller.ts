import { HttpRequest } from "@/data/adapters/http-request";
import { SaveMovies } from "@/domain/usecases/save-movies";
import { IMoviesValidation } from "@/domain/validation/movie-validation";
import { Controller } from "../../../presentation/controllers/controller";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export class UpdateMoviesController implements Controller {
  constructor(
    private readonly httpRequest: HttpRequest,
    private readonly saveMoviesUseCase: SaveMovies,
    private readonly moviesValidation: IMoviesValidation
  ) {}

  async route(): Promise<HttpResponse> {
    const movies = await this.httpRequest.get(
      "https://ghibliapi.herokuapp.com/films?fields=id,title,description,producer,director,movie_banner"
    );
    try {
      await this.moviesValidation.validate(movies.body);
      const savedMovies = await this.saveMoviesUseCase.save(movies.body);

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
