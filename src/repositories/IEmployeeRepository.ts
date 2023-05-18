// Domain
import { Employee } from "~/domain/entity/Employee";

export interface ICreateEmployee {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
}

export interface IEmployeeRepository {
  findByBarbershopId: (barbershopId: string) => Promise<Employee[]>;
  findByEmail: (email: string) => Promise<Employee | undefined>;
  create: (data: ICreateEmployee) => Promise<Employee>;
}
