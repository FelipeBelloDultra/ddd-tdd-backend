import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { CreateBarbershop } from "./CreateBarbershop";

export interface ICreateBarbershopControllerRequest {
  name: string;
  email: string;
  password: string;
}

type IHandleInput = IController<ICreateBarbershopControllerRequest>;

export class CreateBarbershopController implements IHandleInput {
  constructor(private readonly createBarbershop: CreateBarbershop) {}

  public async handle(request: ICreateBarbershopControllerRequest) {
    try {
      const result = await this.createBarbershop.execute({
        email: request.email,
        name: request.name,
        password: request.password,
      });

      if (result.isLeft()) {
        return HttpResponse.clientError(result.value);
      }

      return HttpResponse.created();
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
