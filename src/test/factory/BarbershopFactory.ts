import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { Name } from "@_shared/domain/Name";

import { BaseFactory } from "./BaseFactory";

export class BarbershopFactory {
  static create(): Barbershop {
    const barbershop = Barbershop.create({
      name: Name.create(BaseFactory.makeFullName()).value as Name,
      email: Email.create(BaseFactory.makeEmail()).value as Email,
      password: Password.create(BaseFactory.makePassword()).value as Password,
    });

    return barbershop.value as Barbershop;
  }
}
