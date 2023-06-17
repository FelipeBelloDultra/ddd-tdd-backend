import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { CreateBarbershop } from "@modules/barbershop/application/useCases/CreateBarbershop/CreateBarbershop";
import {
  CreateBarbershopController,
  ICreateBarbershopControllerRequest,
} from "@modules/barbershop/application/useCases/CreateBarbershop/CreateBarbershopController";

export function makeCreateBarbershopController(): IController<ICreateBarbershopControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const barbershopRepository = prismaRepositoryFactory.barbershopRepository;
  const emailValidatorService = new EmailValidatorService({
    barbershopRepository,
    clientRepository: prismaRepositoryFactory.clientRepository,
    employeeRepository: prismaRepositoryFactory.employeeRepository,
  });
  const createBarbershop = new CreateBarbershop({
    emailValidatorService: emailValidatorService,
    createBarbershopRepository: barbershopRepository,
  });
  const createBarbershopController = new CreateBarbershopController(
    createBarbershop
  );

  return createBarbershopController;
}
