import { IHttpResponse } from "./HttpResponse";

export interface IController<T = any> {
  handle: (request: T) => Promise<IHttpResponse>;
}
