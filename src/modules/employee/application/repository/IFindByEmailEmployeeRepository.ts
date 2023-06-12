import { Employee } from "@modules/employee/domain/employee/Employee";

export interface IFindByEmailEmployeeRepository {
  findByEmail: (email: string) => Promise<Employee | undefined>;
}
