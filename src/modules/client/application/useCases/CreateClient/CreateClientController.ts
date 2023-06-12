import { IController } from "@core/infra/IController";
import { clientError, created, fail } from "@core/infra/HttpResponse";

import { CreateClient } from "./CreateClient";

interface ICreateClientControllerRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateClientController implements IController {
  constructor(private readonly createClient: CreateClient) {}

  public async handle(request: ICreateClientControllerRequest) {
    try {
      const result = await this.createClient.execute({
        email: request.email,
        name: request.name,
        password: request.password,
      });

      if (result.isLeft()) {
        return clientError(result.value);
      }

      return created();
    } catch (error) {
      return fail(error as Error);
    }
  }
}
