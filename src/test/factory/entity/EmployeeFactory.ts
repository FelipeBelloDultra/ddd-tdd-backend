import { Employee } from "@modules/employee/domain/employee/Employee";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Phone } from "@_shared/domain/Phone";
import { AvatarUrl } from "@_shared/domain/AvatarUrl";

import { BaseFactory } from "../BaseFactory";

interface ICreateEmployeeFactory {
  barbershopId?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export class EmployeeFactory {
  static create(data: ICreateEmployeeFactory): Employee {
    const employee = Employee.create({
      barbershopId: data.barbershopId || BaseFactory.makeUuid(),
      name: Name.create(data.name || BaseFactory.makeFullName()).value as Name,
      email: Email.create(data.email || BaseFactory.makeEmail()).value as Email,
      phone: Phone.create(data.phone || BaseFactory.makePhone()).value as Phone,
      avatarUrl: AvatarUrl.create(data.avatarUrl || BaseFactory.makeAvatar())
        .value as AvatarUrl,
    });

    return employee.value as Employee;
  }
}
