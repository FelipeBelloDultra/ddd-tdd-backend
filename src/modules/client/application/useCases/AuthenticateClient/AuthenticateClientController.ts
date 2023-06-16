import { IController } from "@core/infra/IController";
import { clientError, fail, ok } from "@core/infra/HttpResponse";

import { AuthenticateClient } from "./AuthenticateClient";

export interface IAuthenticateClientControllerRequest {
  email: string;
  password: string;
}

type IHandleInput = IController<IAuthenticateClientControllerRequest>;

export class AuthenticateClientController implements IHandleInput {
  constructor(private readonly authenticateClient: AuthenticateClient) {}

  public async handle(request: IAuthenticateClientControllerRequest) {
    try {
      const result = await this.authenticateClient.execute({
        email: request.email,
        password: request.password,
      });

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const { token } = result.value;

      return ok({ token });
    } catch (error) {
      return fail(error as Error);
    }
  }
}
