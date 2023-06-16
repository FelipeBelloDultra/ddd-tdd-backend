import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { ScheduleAppointment } from "@modules/appointment/application/useCases/ScheduleAppointment/ScheduleAppointment";
import { ScheduleAppointmentController } from "@modules/appointment/application/useCases/ScheduleAppointment/ScheduleAppointmentController";

export function makeScheduleAppointmentControllerFactory(): IController {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const scheduleAppointment = new ScheduleAppointment({
    findByIdEmployeeRepository: prismaRepositoryFactory.employeeRepository,
    scheduleAppointmentRepositories:
      prismaRepositoryFactory.appointmentRepository,
  });
  const scheduleAppointmentController = new ScheduleAppointmentController(
    scheduleAppointment
  );

  return scheduleAppointmentController;
}
