import { Employee } from "@modules/employee/domain/employee/Employee";

import { Name } from "@modules/_shared/domain/Name";
import { Email } from "@modules/_shared/domain/Email";
import { Phone } from "@modules/_shared/domain/Phone";
import { AvatarUrl } from "@modules/_shared/domain/AvatarUrl";

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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return employee.value as Employee;
  }
}
