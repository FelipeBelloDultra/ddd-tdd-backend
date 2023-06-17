import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { ListEmployeeByBarbershopId } from "@modules/employee/application/useCases/ListEmployeeByBarbershopId/ListEmployeeByBarbershopId";
import {
  IListEmployeeByBarbershopIdControllerRequest,
  ListEmployeeByBarbershopIdController,
} from "@modules/employee/application/useCases/ListEmployeeByBarbershopId/ListEmployeeByBarbershopIdController";

export function makeListEmployeeByBarbershopIdControllerFactory(): IController<IListEmployeeByBarbershopIdControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const showAuthenticatedClient = new ListEmployeeByBarbershopId({
    findByBarbershopIdEmployeeRepository:
      prismaRepositoryFactory.employeeRepository,
  });
  const showAuthenticatedClientController =
    new ListEmployeeByBarbershopIdController(showAuthenticatedClient);

  return showAuthenticatedClientController;
}
