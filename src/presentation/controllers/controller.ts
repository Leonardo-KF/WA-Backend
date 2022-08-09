import { HttpRequest } from "@/presentation/protocols/httpRequest";
import { HttpResponse } from "@/presentation/protocols/httpResponse";

export interface Controller {
  route(req?: HttpRequest): Promise<HttpResponse>;
}
