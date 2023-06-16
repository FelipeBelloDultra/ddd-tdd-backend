import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { CreateClient } from "@modules/client/application/useCases/CreateClient/CreateClient";
import {
  CreateClientController,
  ICreateClientControllerRequest,
} from "@modules/client/application/useCases/CreateClient/CreateClientController";

export function makeCreateClientControllerFactory(): IController<ICreateClientControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const clientRepository = prismaRepositoryFactory.clientRepository;
  const emailValidatorService = new EmailValidatorService({
    barbershopRepository: prismaRepositoryFactory.barbershopRepository,
    clientRepository,
    employeeRepository: prismaRepositoryFactory.employeeRepository,
  });
  const createClient = new CreateClient({
    createClientRepository: clientRepository,
    emailValidatorService: emailValidatorService,
  });
  const createClientController = new CreateClientController(createClient);

  return createClientController;
}
