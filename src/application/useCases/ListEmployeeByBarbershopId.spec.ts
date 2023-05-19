// Imports
// import { faker } from "@faker-js/faker";

// Repository factory
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";

// Use case
import { ListEmployeeByBarbershopId } from "./ListEmployeeByBarbershopId";

describe("ListEmployeeByBarbershopId", () => {
  const fakeRepositoryFactory = new FakeRepositoryFactory();
  const barbershopRepository =
    fakeRepositoryFactory.createBarbershopRepository();
  const employeeRepository = fakeRepositoryFactory.createEmployeeRepository();

  let listEmployeeByBarbershopId: ListEmployeeByBarbershopId;

  beforeEach(() => {
    listEmployeeByBarbershopId = new ListEmployeeByBarbershopId({
      createBarbershopRepository: () => barbershopRepository,
      createEmployeeRepository: () => employeeRepository,
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
