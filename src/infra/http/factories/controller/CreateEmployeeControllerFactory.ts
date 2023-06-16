import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { CreateEmployee } from "@modules/employee/application/useCases/CreateEmployee/CreateEmployee";
import {
  CreateEmployeeController,
  ICreateEmployeeControllerRequest,
} from "@modules/employee/application/useCases/CreateEmployee/CreateEmployeeController";

export function makeCreateEmployeeControllerFactory(): IController<ICreateEmployeeControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const emailValidatorService = new EmailValidatorService({
    barbershopRepository: prismaRepositoryFactory.barbershopRepository,
    clientRepository: prismaRepositoryFactory.clientRepository,
    employeeRepository: prismaRepositoryFactory.employeeRepository,
  });
  const createEmployee = new CreateEmployee({
    emailValidatorService: emailValidatorService,
    createEmployeeRepository: prismaRepositoryFactory.employeeRepository,
    findByIdBarbershopRepository: prismaRepositoryFactory.barbershopRepository,
  });
  const createEmployeeController = new CreateEmployeeController(createEmployee);

  return createEmployeeController;
}
