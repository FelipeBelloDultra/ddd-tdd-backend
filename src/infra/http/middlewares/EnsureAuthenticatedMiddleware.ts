import { IHttpResponse, fail, forbidden, ok } from "@core/infra/HttpResponse";
import { IMiddleware } from "@core/infra/IMiddleware";
import { Jwt } from "@core/domain/Jwt";

import { AccessDeniedError } from "../errors/AccessDeniedError";

export interface IEnsureAuthenticatedMiddlewareRequest {
  accessToken: string;
}

type IHandleInput = IMiddleware<IEnsureAuthenticatedMiddlewareRequest>;

export class EnsureAuthenticatedMiddleware implements IHandleInput {
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
          permissions: authenticatedPermissions,
          id: authenticatedId,
          email: authenticatedEmail,
          name: authenticatedName,
        } = decodedAccessToken.value;

        const hasSomePermissionToAccess = this.middlewarePermissions.some(
          (permission) => authenticatedPermissions.includes(permission)
        );

        if (!hasSomePermissionToAccess)
          return forbidden(new AccessDeniedError());

        return ok({
          authenticatedId,
          authenticatedPermissions,
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
