import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { ListEmployeeMonthAvailability } from "@modules/employee/application/useCases/ListEmployeeMonthAvailability/ListEmployeeMonthAvailability";
import {
  IListEmployeeMonthAvailabilityControllerRequest,
  ListEmployeeMonthAvailabilityController,
} from "@modules/employee/application/useCases/ListEmployeeMonthAvailability/ListEmployeeMonthAvailabilityController";

export function makeListEmployeeMonthAvailabilityControllerFactory(): IController<IListEmployeeMonthAvailabilityControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const listEmployeeMonthAvailability = new ListEmployeeMonthAvailability({
    findAllInMonthFromEmployeeAppointmentRepository:
      prismaRepositoryFactory.appointmentRepository,
  });
  const listEmployeeMonthAvailabilityController =
    new ListEmployeeMonthAvailabilityController(listEmployeeMonthAvailability);

  return listEmployeeMonthAvailabilityController;
}
