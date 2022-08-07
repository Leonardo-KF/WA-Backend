import { HttpResponse } from "../protocols/httpResponse";

export interface UpdateMoviesRoute {
  route(): Promise<HttpResponse>;
}
