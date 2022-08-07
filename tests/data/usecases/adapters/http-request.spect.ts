import { HttpRequest } from "@/application/adapters/http-request";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

class HttpRequestAdapter implements HttpRequest {
  async get(url: string): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {},
    };
  }
}

describe("httpRequest adapter", () => {
  it("should return a valid response", async () => {
    const request = new HttpRequestAdapter();

    const response = request.get("any_url");

    expect(response).toBeDefined();
  });
});
