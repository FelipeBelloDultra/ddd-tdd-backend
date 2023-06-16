import { IMiddleware } from "@core/infra/IMiddleware";

import {
  EnsureAuthenticatedMiddleware,
  IEnsureAuthenticatedMiddlewareRequest,
} from "@infra/http/middlewares/EnsureAuthenticatedMiddleware";

export function makeEnsureAuthenticatedMiddlewareFactory(
  roles: Array<string>
): IMiddleware<IEnsureAuthenticatedMiddlewareRequest> {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    roles
  );

  return ensureAuthenticatedMiddleware;
}
