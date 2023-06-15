import { queries } from "@infra/database/queries";

import { Employee } from "@modules/employee/domain/employee/Employee";
import { EmployeeMapper } from "@modules/employee/application/mappers/EmployeeMapper";

import { IEmployeeRepository } from "../IEmployeeRepository";

export class PrismaEmployeeRepository implements IEmployeeRepository {
  public async create(data: Employee): Promise<Employee> {
    const toPersistence = EmployeeMapper.toPersistence(data);

    await queries.employee.create({
      data: toPersistence,
    });

    return data;
  }

  public async findByBarbershopId(barbershopId: string): Promise<Employee[]> {
    const finded = await queries.employee.findMany({
      where: {
        barbershop_id: barbershopId,
      },
    });

    const toDomainEmployee = finded.map((employee) =>
      EmployeeMapper.toDomain(employee)
    );

    return toDomainEmployee;
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const finded = await queries.employee.findUnique({ where: { email } });

    if (!finded) return undefined;

    return EmployeeMapper.toDomain(finded);
  }

  public async findById(id: string): Promise<Employee | undefined> {
    const finded = await queries.employee.findUnique({
      where: { id_employee: id },
    });

    if (!finded) return undefined;

    return EmployeeMapper.toDomain(finded);
  }
}
