import { HttpResponse } from "../protocols/httpResponse";

export interface SaveMovies {
  route(): Promise<HttpResponse>;
}
