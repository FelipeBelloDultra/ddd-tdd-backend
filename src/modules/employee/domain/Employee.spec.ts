import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";

import { Employee } from "./Employee";

describe("Employee.ts", () => {
  it("should create Employee instance", () => {
    const employee = Employee.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      phone: faker.phone.number(),
      barbershopId: faker.string.uuid(),
    });

    expect(employee).toBeInstanceOf(Employee);
  });
});
