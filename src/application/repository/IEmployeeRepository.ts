// Domain
import { Employee } from "~/domain/entity/Employee";

export interface IEmployeeRepository {
  findByBarbershopId: (barbershopId: string) => Promise<Employee[]>;
  findByEmail: (email: string) => Promise<Employee | undefined>;
  create: (data: Employee) => Promise<Employee>;
}
