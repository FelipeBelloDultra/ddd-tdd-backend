import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";

import { IMiddleware } from "@core/infra/IMiddleware";

export function adaptMiddleware<T>(middleware: IMiddleware<T>) {
  return async (
    request: IRequest,
    response: IResponse,
    next: INextFunction
  ) => {
    const requestData = {
      ...(request.headers || {}),
      ...request.body,
      accessToken: request.headers?.["x-access-token"],
    };

    const httpResponse = await middleware.handle(requestData);

    if (httpResponse.body.middleware) {
      Object.assign(request, httpResponse.body.middleware);

      return next();
    }

    return response.status(httpResponse.statusCode).json({
      data: null,
      error: httpResponse.body.error,
    });
  };
}
