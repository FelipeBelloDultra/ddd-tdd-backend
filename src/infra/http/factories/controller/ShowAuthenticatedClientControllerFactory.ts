import { IController } from "@core/infra/IController";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { ShowAuthenticatedClient } from "@modules/client/application/useCases/ShowAuthenticatedClient/ShowAuthenticatedClient";
import { ShowAuthenticatedClientController } from "@modules/client/application/useCases/ShowAuthenticatedClient/ShowAuthenticatedClientController";

export function makeShowAuthenticatedClientControllerFactory(): IController {
  const fakeRepositoryFactory = FakeRepositoryFactory.create();
  const showAuthenticatedClient = new ShowAuthenticatedClient({
    findByIdClientRepository: fakeRepositoryFactory.clientRepository,
  });
  const showAuthenticatedClientController =
    new ShowAuthenticatedClientController(showAuthenticatedClient);

  return showAuthenticatedClientController;
}
