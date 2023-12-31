import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { ShowAuthenticatedClient } from "@modules/client/application/useCases/ShowAuthenticatedClient/ShowAuthenticatedClient";
import {
  IShowAuthenticatedClientControllerRequest,
  ShowAuthenticatedClientController,
} from "@modules/client/application/useCases/ShowAuthenticatedClient/ShowAuthenticatedClientController";

export function makeShowAuthenticatedClientControllerFactory(): IController<IShowAuthenticatedClientControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const showAuthenticatedClient = new ShowAuthenticatedClient({
    findByIdClientRepository: prismaRepositoryFactory.clientRepository,
  });
  const showAuthenticatedClientController =
    new ShowAuthenticatedClientController(showAuthenticatedClient);

  return showAuthenticatedClientController;
}
