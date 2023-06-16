import { IHttpResponse } from "./HttpResponse";

export interface IMiddleware<T> {
  handle: (httpRequest: T) => Promise<IHttpResponse | false>;
}
