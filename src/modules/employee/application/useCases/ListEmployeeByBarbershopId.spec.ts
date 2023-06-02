import { describe, beforeEach, it, expect } from "vitest";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Employee } from "@modules/employee/domain/Employee";
import { ListEmployeeByBarbershopId } from "./ListEmployeeByBarbershopId";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let listEmployeeByBarbershopId: ListEmployeeByBarbershopId;

describe("ListEmployeeByBarbershopId.ts", () => {
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
    const employeeList = await listEmployeeByBarbershopId.execute({
      barbershopId,
    });

    const result = employeeList.value as Employee[];

    const everyEmployeeHasSameBarbershopId =
      result.length > 0
        ? result.every((employee) => employee.barbershopId === barbershopId)
        : false;

    expect(everyEmployeeHasSameBarbershopId).toBeTruthy();
  });
});
