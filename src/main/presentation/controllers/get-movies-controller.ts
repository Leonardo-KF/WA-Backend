import { FindMovies } from "@/domain/usecases/find-movies";
import { Controller } from "@/presentation/controllers/controller";
import { HttpRequest } from "@/presentation/protocols/httpRequest";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export class GetMoviesController implements Controller {
  constructor(private readonly findMoviesUseCase: FindMovies) {}

  async route(req: HttpRequest): Promise<HttpResponse> {
    const page = parseInt(req.params);
    const movies = await this.findMoviesUseCase.execution(page, 10);
    return {
      statusCode: 200,
      body: movies,
    };
  }
}
