import { Employee } from "@modules/employee/domain/employee/Employee";

import { ICreateEmployeeRepository } from "./ICreateEmployeeRepository";
import { IFindByBarbershopIdEmployeeRepository } from "./IFindByBarbershopIdEmployeeRepository";
import { IFindByIdEmployeeRepository } from "./IFindByIdEmployeeRepository";
import { IFindByEmailEmployeeRepository } from "./IFindByEmailEmployeeRepository";

export interface IEmployeeRepository
  extends ICreateEmployeeRepository,
    IFindByBarbershopIdEmployeeRepository,
    IFindByIdEmployeeRepository,
    IFindByEmailEmployeeRepository {
  findByBarbershopId: (barbershopId: string) => Promise<Employee[]>;
  findByEmail: (email: string) => Promise<Employee | undefined>;
  create: (data: Employee) => Promise<Employee>;
  findById: (id: string) => Promise<Employee | undefined>;
}
