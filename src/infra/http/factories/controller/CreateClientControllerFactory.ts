import { IController } from "@core/infra/IController";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { EmailValidatorService } from "@modules/_shared/application/services/EmailValidatorService";

import { CreateClient } from "@modules/client/application/useCases/CreateClient/CreateClient";
import { CreateClientController } from "@modules/client/application/useCases/CreateClient/CreateClientController";

export function makeCreateContactControllerFactory(): IController {
  const fakeRepositoryFactory = FakeRepositoryFactory.create();
  const clientRepository = fakeRepositoryFactory.clientRepository;
  const emailValidatorService = new EmailValidatorService({
    barbershopRepository: fakeRepositoryFactory.barbershopRepository,
    clientRepository,
    employeeRepository: fakeRepositoryFactory.employeeRepository,
  });
  const createClient = new CreateClient(
    clientRepository,
    emailValidatorService
  );
  const createClientController = new CreateClientController(createClient);

  return createClientController;
}
