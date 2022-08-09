import { HttpRequest } from "@/data/adapters/http-request";
import { HttpResponse } from "@/presentation/protocols/httpResponse";
import { faker } from "@faker-js/faker";

export class MockGetRequest implements HttpRequest {
  movies = [];
  async get(url: string): Promise<HttpResponse> {
    for (let i = 0; i < 20; i++) {
      const movie = {
        id: faker.random.alphaNumeric(10),
        title: faker.name.jobTitle(),
        banner: faker.image.imageUrl(),
        description: faker.lorem.paragraph(),
        director: faker.name.firstName(),
        producer: faker.name.firstName(),
      };
      this.movies.push(movie);
    }

    return {
      statusCode: 200,
      body: this.movies,
    };
  }
}
