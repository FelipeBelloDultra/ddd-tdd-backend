import { Employee } from "@modules/employee/domain/entity/Employee";

export interface IEmployeeRepository {
  findByBarbershopId: (barbershopId: string) => Promise<Employee[]>;
  findByEmail: (email: string) => Promise<Employee | undefined>;
  create: (data: Employee) => Promise<Employee>;
  findById: (id: string) => Promise<Employee | undefined>;
}
