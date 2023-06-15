import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";

import { IMiddleware } from "@core/infra/IMiddleware";

export function adaptMiddleware(middleware: IMiddleware) {
  return async (
    request: IRequest,
    response: IResponse,
    next: INextFunction
  ) => {
    const requestData = {
      accessToken: request.headers?.["x-access-token"],
      ...(request.headers || {}),
    };

    const httpResponse = await middleware.handle(requestData, request.body);

    if (httpResponse === false) {
      return response.status(200).send();
    }

    if (httpResponse.ok) {
      Object.assign(request, httpResponse.body);

      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      });
    }
  };
}
