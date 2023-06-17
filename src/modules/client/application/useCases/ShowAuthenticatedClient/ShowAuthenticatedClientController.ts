import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { ShowAuthenticatedClient } from "./ShowAuthenticatedClient";
import { Presenter } from "./Presenter";

export interface IShowAuthenticatedClientControllerRequest {
  authenticatedId: string;
}

type IHandleInput = IController<IShowAuthenticatedClientControllerRequest>;

export class ShowAuthenticatedClientController implements IHandleInput {
  constructor(
    private readonly showAuthenticatedClient: ShowAuthenticatedClient
  ) {}

  public async handle(request: IShowAuthenticatedClientControllerRequest) {
    try {
      const result = await this.showAuthenticatedClient.execute({
        clientId: request.authenticatedId,
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
