import { Request as IRequest, Response as IResponse } from "express";
import { IController } from "@core/infra/IController";

export function adaptRoute<T>(controller: IController<T>) {
  return async (request: IRequest, response: IResponse) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      authenticatedId: request.authenticatedId,
    };

    const httpResponse = await controller.handle(requestData);

    if (httpResponse.ok) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }

    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body.error,
    });
  };
}
