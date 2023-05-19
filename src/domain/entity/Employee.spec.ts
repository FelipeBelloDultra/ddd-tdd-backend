// Packages
import { faker } from "@faker-js/faker";

// Domain
import { Employee } from "./Employee";

describe("Employee.ts", () => {
  it("should create Employee instance", () => {
    const employee = new Employee({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      phone: faker.phone.number(),
      barbershopId: faker.string.uuid(),
    });

    expect(employee).toBeInstanceOf(Employee);
  });
});
