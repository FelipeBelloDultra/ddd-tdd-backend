// Packages
import { faker } from "@faker-js/faker";

// Domain
import { Employee } from "~/domain/Employee";

// Interfaces
import { IEmployeeRepository } from "../IEmployeeRepository";

export class FakeEmployeeRepository implements IEmployeeRepository {
  private readonly employees: Employee[];

  constructor() {
    const firstBarbershopId = "123";
    const firstEmployees = Array.from({ length: 5 }).map(
      () =>
        new Employee({
          barbershopId: firstBarbershopId,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          avatarUrl: faker.internet.avatar(),
        })
    );
    const secondBarbershopId = "321";
    const secondEmployees = Array.from({ length: 3 }).map(
      () =>
        new Employee({
          barbershopId: secondBarbershopId,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          avatarUrl: faker.internet.avatar(),
        })
    );

    this.employees = [...firstEmployees, ...secondEmployees];
  }

  public async findByBarbershopId(barbershopId: string): Promise<Employee[]> {
    const finded = this.employees.filter(
      (employee) => employee.barbershopId === barbershopId
    );

    return Promise.resolve(finded);
  }
}
