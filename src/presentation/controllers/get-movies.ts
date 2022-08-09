import { HttpRequest } from "@/presentation/protocols/httpRequest";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export interface GetMoviesRoute {
  route(req: HttpRequest): Promise<HttpResponse>;
}
