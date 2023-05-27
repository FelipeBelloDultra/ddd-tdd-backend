import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";
import { ListEmployeeByBarbershopId } from "~/application/useCases/ListEmployeeByBarbershopId";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let listEmployeeByBarbershopId: ListEmployeeByBarbershopId;

describe("ListEmployeeByBarbershopId", () => {
  beforeEach(() => {
    listEmployeeByBarbershopId = new ListEmployeeByBarbershopId({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should return an list of employees by barbershop id", async () => {
    const barbershopId = "123";
    const result = await listEmployeeByBarbershopId.execute({
      barbershopId,
    });

    const everyEmployeeHasSameBarbershopId =
      result.length > 0
        ? result.every((employee) => employee.barbershopId === barbershopId)
        : false;

    expect(everyEmployeeHasSameBarbershopId).toBeTruthy();
  });
});
