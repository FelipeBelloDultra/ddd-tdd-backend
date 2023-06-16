import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { CreateEmployee } from "./CreateEmployee";

export interface ICreateEmployeeControllerRequest {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  authenticatedId: string;
}

type IHandleInput = IController<ICreateEmployeeControllerRequest>;

export class CreateEmployeeController implements IHandleInput {
  constructor(private readonly createEmployee: CreateEmployee) {}

  public async handle(request: ICreateEmployeeControllerRequest) {
    try {
      const result = await this.createEmployee.execute({
        name: request.name,
        email: request.email,
        phone: request.phone,
        avatarUrl: request.avatarUrl,
        barbershopId: request.authenticatedId,
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
