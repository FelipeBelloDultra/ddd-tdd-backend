import { Employee } from "@modules/employee/domain/employee/Employee";

import { AvatarUrl } from "@_shared/domain/AvatarUrl";
import { Email } from "@_shared/domain/Email";
import { Name } from "@_shared/domain/Name";
import { Phone } from "@_shared/domain/Phone";

export interface IPersistenceEmployee {
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
    const name = Name.create(raw.name);
    if (name.isLeft()) {
      throw new Error("Name value is invalid");
    }

    const email = Email.create(raw.email);
    if (email.isLeft()) {
      throw new Error("Email value is invalid");
    }

    const phone = Phone.create(raw.phone);
    if (phone.isLeft()) {
      throw new Error("Phone value is invalid");
    }

    const avatarUrl = AvatarUrl.create(raw.avatar_url);
    if (avatarUrl.isLeft()) {
      throw new Error("AvatarUrl value is invalid");
    }

    const employee = Employee.create(
      {
        name: name.value,
        email: email.value,
        phone: phone.value,
        avatarUrl: avatarUrl.value,
        barbershopId: raw.barbershop_id,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id_employee
    );

    return employee.value as Employee;
  }

  static toPersistence(employee: Employee): IPersistenceEmployee {
    return {
      id_employee: employee.id,
      name: employee.name.value,
      email: employee.email.value,
      phone: employee.phone.value,
      avatar_url: employee.avatarUrl.value,
      barbershop_id: employee.barbershopId,
      created_at: employee.createdAt,
      updated_at: employee.updatedAt,
    };
  }
}
