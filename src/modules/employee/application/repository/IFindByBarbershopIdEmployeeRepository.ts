import { Employee } from "@modules/employee/domain/employee/Employee";

export interface IFindByBarbershopIdEmployeeRepository {
  findByBarbershopId: (barbershopId: string) => Promise<Employee[]>;
}
