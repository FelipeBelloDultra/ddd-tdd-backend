import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { AuthenticateClient } from "@modules/client/application/useCases/AuthenticateClient/AuthenticateClient";
import { AuthenticateClientController } from "@modules/client/application/useCases/AuthenticateClient/AuthenticateClientController";

export function makeAuthenticateClientControllerFactory(): IController {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();

  const emailValidatorService = new EmailValidatorService({
    barbershopRepository: prismaRepositoryFactory.barbershopRepository,
    clientRepository: prismaRepositoryFactory.clientRepository,
    employeeRepository: prismaRepositoryFactory.employeeRepository,
  });
  const authenticateService = new AuthenticateService({
    emailValidatorService,
  });
  const authenticateClient = new AuthenticateClient({
    authenticateService,
  });
  const authenticateClientController = new AuthenticateClientController(
    authenticateClient
  );

  return authenticateClientController;
}
