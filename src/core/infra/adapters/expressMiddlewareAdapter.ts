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

    if (httpResponse === false) {
      return response.status(200).send();
    }

    if (!httpResponse.body.error) {
      Object.assign(request, httpResponse.body.data);

      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      });
    }
  };
}
