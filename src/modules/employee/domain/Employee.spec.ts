import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Employee } from "./Employee";

describe("Employee.ts", () => {
  it("should create Employee instance", () => {
    const employee = Employee.create({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      avatarUrl: BaseFactory.makeAvatar(),
      phone: BaseFactory.makePhone(),
      barbershopId: BaseFactory.makeUuid(),
    });

    expect(employee).toBeInstanceOf(Employee);
  });
});
