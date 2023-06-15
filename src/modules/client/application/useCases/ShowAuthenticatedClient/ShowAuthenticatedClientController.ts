import { IController } from "@core/infra/IController";
import { clientError, fail, ok } from "@core/infra/HttpResponse";

import { ShowAuthenticatedClient } from "./ShowAuthenticatedClient";

interface IShowAuthenticatedClientControllerRequest {
  clientId: string;
}

export class ShowAuthenticatedClientController implements IController {
  constructor(
    private readonly showAuthenticatedClient: ShowAuthenticatedClient
  ) {}

  public async handle(request: IShowAuthenticatedClientControllerRequest) {
    try {
      const result = await this.showAuthenticatedClient.execute({
        clientId: request.clientId,
      });

      if (result.isLeft()) {
        return clientError(result.value);
      }

      const { id, name, email, createdAt } = result.value;

      return ok({
        id,
        name: name.value,
        email: email.value,
        createdAt,
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}
