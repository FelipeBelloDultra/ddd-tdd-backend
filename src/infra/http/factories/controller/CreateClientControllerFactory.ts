import { IController } from "@core/infra/IController";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { CreateClient } from "@modules/client/application/useCases/CreateClient/CreateClient";
import { CreateClientController } from "@modules/client/application/useCases/CreateClient/CreateClientController";

export function makeCreateContactControllerFactory(): IController {
  const fakeRepositoryFactory = FakeRepositoryFactory.create();

  const createClient = new CreateClient({
    createAppointmentRepository: () =>
      fakeRepositoryFactory.appointmentRepository,
    createBarbershopRepository: () =>
      fakeRepositoryFactory.barbershopRepository,
    createClientRepository: () => fakeRepositoryFactory.clientRepository,
    createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
  });
  const createClientController = new CreateClientController(createClient);

  return createClientController;
}
