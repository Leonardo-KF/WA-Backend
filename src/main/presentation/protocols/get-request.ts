import { HttpRequest } from "@/data/adapters/http-request";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export class GetRequest implements HttpRequest {
  get(url: string): Promise<HttpResponse> {
    return Promise.resolve({
      statusCode: 200,
      body: {
        message: "success",
      },
    });
  }
}
