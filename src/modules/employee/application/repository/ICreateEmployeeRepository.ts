import { Employee } from "@modules/employee/domain/employee/Employee";

export interface ICreateEmployeeRepository {
  create: (data: Employee) => Promise<Employee>;
}
