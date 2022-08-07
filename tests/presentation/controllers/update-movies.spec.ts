import { HttpRequest } from "@/application/adapters/http-request";
import { HttpResponse } from "../protocols/httpResponse";
import { UpdateMoviesRoute } from "./update-movies";

class UpdateMoviesController implements UpdateMoviesRoute {
  constructor(private httpRequest: HttpRequest) {}
  route(): Promise<HttpResponse> {}
}

describe("UpdateMoviesRoute", () => {
  it("should update movies", async () => {
    const updateMovies = new UpdateMoviesRoute();

    const response = updateMovies.request();

    expect(response.status).toBe(200);
  });
});
