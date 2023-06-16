import { IHttpResponse, fail, forbidden, ok } from "@core/infra/HttpResponse";
import { IMiddleware } from "@core/infra/IMiddleware";
import { Jwt } from "@core/domain/Jwt";

import { AccessDeniedError } from "../errors/AccessDeniedError";

interface IEnsureAuthenticatedMiddlewareRequest {
  accessToken: string;
}

export class EnsureAuthenticatedMiddleware implements IMiddleware {
  constructor(private readonly middlewarePermissions: Array<string>) {}

  public async handle(
    request: IEnsureAuthenticatedMiddlewareRequest
  ): Promise<IHttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        const decodedAccessToken = Jwt.decodeToken(accessToken);

        if (decodedAccessToken.isLeft())
          return forbidden(new AccessDeniedError());

        const {
          permissions: authenticatedRole,
          id: authenticatedId,
          email: authenticatedEmail,
          name: authenticatedName,
        } = decodedAccessToken.value;

        const somePermission = this.middlewarePermissions.some((permission) =>
          authenticatedRole.includes(permission)
        );

        if (!somePermission) return forbidden(new AccessDeniedError());

        return ok({
          authenticatedId,
          authenticatedRole,
          authenticatedName,
          authenticatedEmail,
        });
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return fail(error as Error);
    }
  }
}
