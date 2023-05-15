// Domain
import { Employee } from "~/domain/Employee";

export interface IEmployeeRepository {
  findByBarbershopId: (barbershopId: string) => Promise<Employee[]>;
}
