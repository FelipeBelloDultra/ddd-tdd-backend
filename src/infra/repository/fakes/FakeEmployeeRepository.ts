import { Employee } from "@modules/employee/domain/employee/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import {
  EmployeeMapper,
  IPersistenceEmployee,
} from "@modules/employee/application/mappers/EmployeeMapper";

import { EmployeeFactory } from "@test/factory/entity/EmployeeFactory";

export class FakeEmployeeRepository implements IEmployeeRepository {
  private readonly employees: IPersistenceEmployee[];

  constructor() {
    const firstBarbershopId = "123";
    const firstEmployees = Array.from({ length: 5 }).map(() => {
      const employee = EmployeeFactory.create({
        barbershopId: firstBarbershopId,
      });

      return EmployeeMapper.toPersistence(employee);
    });
    const secondBarbershopId = "321";
    const secondEmployees = Array.from({ length: 3 }).map(() => {
      const employee = EmployeeFactory.create({
        barbershopId: secondBarbershopId,
      });

      return EmployeeMapper.toPersistence(employee);
    });

    this.employees = [...firstEmployees, ...secondEmployees];
  }

  public async create(data: Employee): Promise<Employee> {
    this.employees.push(EmployeeMapper.toPersistence(data));

    return Promise.resolve(data);
  }

  public async findByBarbershopId(barbershopId: string): Promise<Employee[]> {
    const finded = this.employees
      .filter((employee) => employee.barbershop_id === barbershopId)
      .map((employee) =>
        EmployeeMapper.toDomain({
          id_employee: employee.id_employee,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          avatar_url: employee.avatar_url,
          barbershop_id: employee.barbershop_id,
          created_at: employee.created_at,
          updated_at: employee.updated_at,
        })
      );

    return Promise.resolve(finded);
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const finded = this.employees.find((employee) => employee.email === email);

    if (!finded) return undefined;

    return Promise.resolve(
      EmployeeMapper.toDomain({
        name: finded.name,
        email: finded.email,
        avatar_url: finded.avatar_url,
        barbershop_id: finded.barbershop_id,
        id_employee: finded.id_employee,
        phone: finded.phone,
        created_at: finded.created_at,
        updated_at: finded.updated_at,
      })
    );
  }

  public async findById(id: string): Promise<Employee | undefined> {
    const finded = this.employees.find(
      (employee) => employee.id_employee === id
    );

    if (!finded) return undefined;

    return Promise.resolve(EmployeeMapper.toDomain(finded));
  }
}
