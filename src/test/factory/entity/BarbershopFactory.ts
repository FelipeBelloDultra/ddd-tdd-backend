import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { Name } from "@_shared/domain/Name";

import { BaseFactory } from "../BaseFactory";

interface ICreateBarbershopFactory {
  name?: string;
  email?: string;
  passwrd?: string;
}

export class BarbershopFactory {
  static create(data: ICreateBarbershopFactory): Barbershop {
    const barbershop = Barbershop.create({
      name: Name.create(data.name || BaseFactory.makeFullName()).value as Name,
      email: Email.create(data.email || BaseFactory.makeEmail()).value as Email,
      password: Password.create(data.passwrd || BaseFactory.makePassword())
        .value as Password,
    });

    return barbershop.value as Barbershop;
  }
}
