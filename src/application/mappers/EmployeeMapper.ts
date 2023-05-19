import { Employee } from "~/domain/entity/Employee";

interface IPersistenceEmployee {
  id_employee: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  barbershop_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export class EmployeeMapper {
  static toDomain(raw: IPersistenceEmployee): Employee {
    const employee = Employee.create(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        avatarUrl: raw.avatar_url,
        barbershopId: raw.barbershop_id,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id_employee
    );

    return employee;
  }

  static toPersistence(employee: Employee): IPersistenceEmployee {
    return {
      id_employee: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      avatar_url: employee.avatarUrl,
      barbershop_id: employee.barbershopId,
      created_at: employee.createdAt,
      updated_at: employee.updatedAt,
    };
  }
}
