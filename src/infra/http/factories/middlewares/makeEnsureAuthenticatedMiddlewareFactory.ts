import { IMiddleware } from "@core/infra/IMiddleware";

import { EnsureAuthenticatedMiddleware } from "@infra/http/middlewares/EnsureAuthenticatedMiddleware";

export function makeEnsureAuthenticatedMiddlewareFactory(
  roles: Array<string>
): IMiddleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    roles
  );

  return ensureAuthenticatedMiddleware;
}
