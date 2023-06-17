import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { ListEmployeeMonthAvailability } from "./ListEmployeeMonthAvailability";

export interface IListEmployeeMonthAvailabilityControllerRequest {
  employeeId: string;
  month: string;
  year: string;
}

type IHandleInput =
  IController<IListEmployeeMonthAvailabilityControllerRequest>;

export class ListEmployeeMonthAvailabilityController implements IHandleInput {
  constructor(
    private readonly listEmployeeMonthAvailability: ListEmployeeMonthAvailability
  ) {}

  public async handle(
    request: IListEmployeeMonthAvailabilityControllerRequest
  ) {
    try {
      const result = await this.listEmployeeMonthAvailability.execute({
        employeeId: request.employeeId,
        month: Number(request.month),
        year: Number(request.year),
      });

      return HttpResponse.ok(result.value);
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
