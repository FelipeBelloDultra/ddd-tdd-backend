import { Employee } from "@modules/employee/domain/employee/Employee";

export interface IFindByIdEmployeeRepository {
  findById: (id: string) => Promise<Employee | undefined>;
}
