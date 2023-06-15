import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { ListEmployeeByBarbershopId } from "./ListEmployeeByBarbershopId";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let listEmployeeByBarbershopId: ListEmployeeByBarbershopId;

describe("ListEmployeeByBarbershopId.ts", () => {
  beforeEach(() => {
    listEmployeeByBarbershopId = new ListEmployeeByBarbershopId({
      findByBarbershopIdEmployeeRepository:
        fakeRepositoryFactory.employeeRepository,
    });
  });

  it("should return an list of employees by barbershop id", async () => {
    const barbershopId = "123";
    const result = await listEmployeeByBarbershopId.execute({
      barbershopId,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    expect(
      result.value.every((employee) => employee.barbershopId === barbershopId)
    ).toBeTruthy();
  });
});
