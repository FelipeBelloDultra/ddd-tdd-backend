import { IHttpResponse } from "./HttpResponse";

export interface IController<T> {
  handle: (request: T) => Promise<IHttpResponse>;
}
