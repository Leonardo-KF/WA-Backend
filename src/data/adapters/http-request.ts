import { HttpResponse } from "@/presentation/protocols/httpResponse";

export interface HttpRequest {
  get(url: string): Promise<HttpResponse>;
}
