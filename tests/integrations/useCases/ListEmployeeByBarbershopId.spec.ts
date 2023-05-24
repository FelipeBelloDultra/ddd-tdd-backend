import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";
import { ListEmployeeByBarbershopId } from "~/application/useCases/ListEmployeeByBarbershopId";

describe("ListEmployeeByBarbershopId", () => {
  const fakeRepositoryFactory = new FakeRepositoryFactory();
  const barbershopRepository =
    fakeRepositoryFactory.createBarbershopRepository();
  const employeeRepository = fakeRepositoryFactory.createEmployeeRepository();
  const appointmentRepository =
    fakeRepositoryFactory.createAppointmentRepository();

  let listEmployeeByBarbershopId: ListEmployeeByBarbershopId;

  beforeEach(() => {
    listEmployeeByBarbershopId = new ListEmployeeByBarbershopId({
      createBarbershopRepository: () => barbershopRepository,
      createEmployeeRepository: () => employeeRepository,
      createAppointmentRepository: () => appointmentRepository,
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
