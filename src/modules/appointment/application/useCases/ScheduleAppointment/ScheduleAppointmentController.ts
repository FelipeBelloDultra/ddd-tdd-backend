import { IController } from "@core/infra/IController";
import { clientError, fail, ok } from "@core/infra/HttpResponse";

import { ScheduleAppointment } from "./ScheduleAppointment";

interface IScheduleAppointmentControllerRequest {
  employeeId: string;
  date: Date;
  authenticatedId: string;
}

export class ScheduleAppointmentController implements IController {
  constructor(private readonly scheduleAppointment: ScheduleAppointment) {}

  public async handle(request: IScheduleAppointmentControllerRequest) {
    try {
      const result = await this.scheduleAppointment.execute({
        clientId: request.authenticatedId,
        date: request.date,
        employeeId: request.employeeId,
      });

      if (result.isLeft()) return clientError(result.value);

      const { employeeId, date, clientId } = result.value;

      return ok({
        employeeId,
        date: date.value,
        clientId,
      });
    } catch (error) {
      return fail(error as Error);
    }
  }
}
