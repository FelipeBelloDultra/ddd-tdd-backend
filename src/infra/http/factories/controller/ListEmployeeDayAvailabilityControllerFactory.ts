import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { ListEmployeeDayAvailability } from "@modules/employee/application/useCases/ListEmployeeDayAvailability/ListEmployeeDayAvailability";
import {
  IListEmployeeDayAvailabilityControllerRequest,
  ListEmployeeDayAvailabilityController,
} from "@modules/employee/application/useCases/ListEmployeeDayAvailability/ListEmployeeDayAvailabilityController";

export function makeListEmployeeDayAvailabilityControllerFactory(): IController<IListEmployeeDayAvailabilityControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const listEmployeeDayAvailability = new ListEmployeeDayAvailability({
    findAllInDayFromEmployeeAppointmentRepository:
      prismaRepositoryFactory.appointmentRepository,
  });
  const listEmployeeDayAvailabilityController =
    new ListEmployeeDayAvailabilityController(listEmployeeDayAvailability);

  return listEmployeeDayAvailabilityController;
}
