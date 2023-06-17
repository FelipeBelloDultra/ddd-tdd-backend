import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { AuthenticateBarbershop } from "@modules/barbershop/application/useCases/AuthenticateBarbershop/AuthenticateBarbershop";
import {
  AuthenticateBarbershopController,
  IAuthenticateBarbershopControllerRequest,
} from "@modules/barbershop/application/useCases/AuthenticateBarbershop/AuthenticateBarbershopController";

export function makeAuthenticateBarbershopControllerFactory(): IController<IAuthenticateBarbershopControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const emailValidatorService = new EmailValidatorService({
    barbershopRepository: prismaRepositoryFactory.barbershopRepository,
    clientRepository: prismaRepositoryFactory.clientRepository,
    employeeRepository: prismaRepositoryFactory.employeeRepository,
  });
  const authenticateService = new AuthenticateService({
    emailValidatorService,
  });
  const authenticateBarbershop = new AuthenticateBarbershop({
    authenticateService,
  });
  const authenticateBarbershopController = new AuthenticateBarbershopController(
    authenticateBarbershop
  );

  return authenticateBarbershopController;
}
