import { faker } from "@faker-js/faker";
import { Employee } from "~/domain/entity/Employee";
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";

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

  public async create(data: Employee): Promise<Employee> {
    const employee = new Employee(data, data._id);

    this.employees.push(employee);

    return employee;
  }

  public async findByBarbershopId(barbershopId: string): Promise<Employee[]> {
    const finded = this.employees.filter(
      (employee) => employee.barbershopId === barbershopId
    );

    return Promise.resolve(finded);
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const finded = this.employees.find((employee) => employee.email === email);

    return finded;
  }
}
