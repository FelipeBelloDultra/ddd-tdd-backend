import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { ShowAuthenticatedBarbershop } from "@modules/barbershop/application/useCases/ShowAuthenticatedBarbershop/ShowAuthenticatedBarbershop";
import {
  IShowAuthenticatedBarbershopControllerRequest,
  ShowAuthenticatedBarbershopController,
} from "@modules/barbershop/application/useCases/ShowAuthenticatedBarbershop/ShowAuthenticatedBarbershopController";

export function makeShowAuthenticatedBarbershopControllerFactory(): IController<IShowAuthenticatedBarbershopControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const showAuthenticatedBarbershop = new ShowAuthenticatedBarbershop({
    findByIdBarbershopRepository: prismaRepositoryFactory.barbershopRepository,
  });
  const showAuthenticatedBarbershopController =
    new ShowAuthenticatedBarbershopController(showAuthenticatedBarbershop);

  return showAuthenticatedBarbershopController;
}
