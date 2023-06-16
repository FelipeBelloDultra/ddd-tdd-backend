import { IMiddleware } from "@core/infra/IMiddleware";
import { HttpResponse } from "@core/infra/HttpResponse";
import { Jwt } from "@core/domain/Jwt";

import { AccessDeniedError } from "../errors/AccessDeniedError";

export interface IEnsureAuthenticatedMiddlewareRequest {
  accessToken: string;
}

type IHandleInput = IMiddleware<IEnsureAuthenticatedMiddlewareRequest>;

export class EnsureAuthenticatedMiddleware implements IHandleInput {
  constructor(private readonly middlewarePermissions: Array<string>) {}

  public async handle(request: IEnsureAuthenticatedMiddlewareRequest) {
    try {
      const { accessToken } = request;

      if (accessToken) {
        const decodedAccessToken = Jwt.decodeToken(accessToken);

        if (decodedAccessToken.isLeft())
          return HttpResponse.forbidden(new AccessDeniedError());

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
          return HttpResponse.forbidden(new AccessDeniedError());

        return HttpResponse.ok({
          authenticatedId,
          authenticatedPermissions,
          authenticatedName,
          authenticatedEmail,
        });
      }

      return HttpResponse.forbidden(new AccessDeniedError());
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
