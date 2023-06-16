import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { ScheduleAppointment } from "./ScheduleAppointment";

export interface IScheduleAppointmentControllerRequest {
  employeeId: string;
  date: Date;
  authenticatedId: string;
}

type IHandleInput = IController<IScheduleAppointmentControllerRequest>;

export class ScheduleAppointmentController implements IHandleInput {
  constructor(private readonly scheduleAppointment: ScheduleAppointment) {}

  public async handle(request: IScheduleAppointmentControllerRequest) {
    try {
      const result = await this.scheduleAppointment.execute({
        clientId: request.authenticatedId,
        date: request.date,
        employeeId: request.employeeId,
      });

      if (result.isLeft()) return HttpResponse.clientError(result.value);

      const { employeeId, date, clientId } = result.value;

      return HttpResponse.ok({
        employeeId,
        date: date.value,
        clientId,
      });
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
