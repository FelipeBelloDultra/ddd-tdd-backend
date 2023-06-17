import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { AuthenticateBarbershop } from "./AuthenticateBarbershop";
import { Presenter } from "./Presenter";

export interface IAuthenticateBarbershopControllerRequest {
  email: string;
  password: string;
}

type IHandleInput = IController<IAuthenticateBarbershopControllerRequest>;

export class AuthenticateBarbershopController implements IHandleInput {
  constructor(
    private readonly authenticateBarbershop: AuthenticateBarbershop
  ) {}

  public async handle(request: IAuthenticateBarbershopControllerRequest) {
    try {
      const result = await this.authenticateBarbershop.execute({
        email: request.email,
        password: request.password,
      });

      if (result.isLeft()) {
        return HttpResponse.unauthorized(result.value);
      }

      const toPresent = new Presenter().toJson(result.value);

      return HttpResponse.ok(toPresent);
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
