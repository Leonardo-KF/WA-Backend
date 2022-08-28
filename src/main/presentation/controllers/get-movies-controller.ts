import { CountMovies } from "@/domain/usecases/count-movies";
import { FindMovies } from "@/domain/usecases/find-movies";
import { Controller } from "@/presentation/controllers/controller";
import { HttpRequest } from "@/presentation/protocols/httpRequest";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export class GetMoviesController implements Controller {
  constructor(
    private readonly findMoviesUseCase: FindMovies,
    private readonly countMoviesUseCase: CountMovies
  ) {}

  async route(req: HttpRequest): Promise<HttpResponse> {
    try {
      const page = parseInt(req.params);
      const movies = await this.findMoviesUseCase.execution(page, 10);
      const count = await this.countMoviesUseCase.execution();
      return {
        statusCode: 200,
        body: { movies: movies, maxMovies: count },
      };
    } catch (e) {
      console.log(e);
      return { statusCode: 400, body: { error: e.message } };
    }
  }
}
