import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { ListEmployeeDayAvailability } from "./ListEmployeeDayAvailability";

export interface IListEmployeeDayAvailabilityControllerRequest {
  employeeId: string;
  month: string;
  year: string;
  day: string;
}

type IHandleInput = IController<IListEmployeeDayAvailabilityControllerRequest>;

export class ListEmployeeDayAvailabilityController implements IHandleInput {
  constructor(
    private readonly listEmployeeDayAvailability: ListEmployeeDayAvailability
  ) {}

  public async handle(request: IListEmployeeDayAvailabilityControllerRequest) {
    try {
      const result = await this.listEmployeeDayAvailability.execute({
        employeeId: request.employeeId,
        month: Number(request.month),
        year: Number(request.year),
        day: Number(request.day),
      });

      return HttpResponse.ok(result.value);
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
