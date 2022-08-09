import { HttpRequest } from "@/data/adapters/http-request";
import { HttpResponse } from "../protocols/httpResponse";

export class GetData implements HttpRequest {
  get(url: string): Promise<HttpResponse> {
    throw new Error("Method not implemented.");
  }
}
