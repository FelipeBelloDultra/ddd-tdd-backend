import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { ShowAuthenticatedBarbershop } from "./ShowAuthenticatedBarbershop";
import { Presenter } from "./Presenter";

export interface IShowAuthenticatedBarbershopControllerRequest {
  authenticatedId: string;
}

type IHandleInput = IController<IShowAuthenticatedBarbershopControllerRequest>;

export class ShowAuthenticatedBarbershopController implements IHandleInput {
  constructor(
    private readonly showAuthenticatedBarbershop: ShowAuthenticatedBarbershop
  ) {}

  public async handle(request: IShowAuthenticatedBarbershopControllerRequest) {
    try {
      const result = await this.showAuthenticatedBarbershop.execute({
        barbershopId: request.authenticatedId,
      });

      if (result.isLeft()) {
        return HttpResponse.clientError(result.value);
      }

      const toPresent = new Presenter().toJson(result.value);

      return HttpResponse.ok(toPresent);
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
