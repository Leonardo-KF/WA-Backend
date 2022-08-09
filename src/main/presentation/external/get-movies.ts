import { HttpRequest } from "@/data/adapters/http-request";
import { HttpResponse } from "@/presentation/protocols/httpResponse";
import axios from "axios";

export class GetRequest implements HttpRequest {
  async get(url: string): Promise<HttpResponse> {
    const movies = await axios.get(url);
    return {
      statusCode: movies.status,
      body: movies.data,
    };
  }
}
