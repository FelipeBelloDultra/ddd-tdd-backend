import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { ListEmployeeByBarbershopId } from "./ListEmployeeByBarbershopId";
import { Presenter } from "./Presenter";

export interface IListEmployeeByBarbershopIdControllerRequest {
  barbershopId: string;
}

type IHandleInput = IController<IListEmployeeByBarbershopIdControllerRequest>;

export class ListEmployeeByBarbershopIdController implements IHandleInput {
  constructor(
    private readonly listEmployeeByBarbershopId: ListEmployeeByBarbershopId
  ) {}

  public async handle(request: IListEmployeeByBarbershopIdControllerRequest) {
    try {
      const result = await this.listEmployeeByBarbershopId.execute({
        barbershopId: request.barbershopId,
      });

      const toPresent = new Presenter().toJson(
        result.isRight() ? result.value : []
      );

      return HttpResponse.ok(toPresent);
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
