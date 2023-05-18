// Imports
import { describe, it, expect, beforeEach } from "vitest";
// import { faker } from "@faker-js/faker";

// Repositories
import { FakeEmployeeRepository } from "~/application/repository/fakes/FakeEmployeeRepository";

// Use case
import { ListEmployeeByBarbershopId } from "./ListEmployeeByBarbershopId";

describe("ListEmployeeByBarbershopId", () => {
  let listEmployeeByBarbershopId: ListEmployeeByBarbershopId;
  let fakeEmployeeRepository: FakeEmployeeRepository;

  beforeEach(() => {
    fakeEmployeeRepository = new FakeEmployeeRepository();
    listEmployeeByBarbershopId = new ListEmployeeByBarbershopId(
      fakeEmployeeRepository
    );
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
