import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

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
        return HttpResponse.clientError(result.value);
      }

      const { token } = result.value;

      return HttpResponse.ok({ token });
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
