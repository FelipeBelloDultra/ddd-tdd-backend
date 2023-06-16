import { IController } from "@core/infra/IController";
import { clientError, fail, ok } from "@core/infra/HttpResponse";

import { ShowAuthenticatedClient } from "./ShowAuthenticatedClient";

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
        return clientError(result.value);
      }

      const { id, name, email } = result.value;

      return ok({
        id,
        name: name.value,
        email: email.value,
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}
