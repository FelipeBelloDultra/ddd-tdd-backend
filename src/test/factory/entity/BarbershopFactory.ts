import { Jwt } from "@core/domain/Jwt";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { Name } from "@_shared/domain/Name";

import { BaseFactory } from "../BaseFactory";

interface ICreateBarbershopFactory {
  name?: string;
  email?: string;
  password?: string;
}

export class BarbershopFactory {
  static create(data: ICreateBarbershopFactory): Barbershop {
    const barbershop = Barbershop.create({
      name: Name.create(data.name || BaseFactory.makeFullName()).value as Name,
      email: Email.create(data.email || BaseFactory.makeEmail()).value as Email,
      password: Password.create(data.password || BaseFactory.makePassword())
        .value as Password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return barbershop.value as Barbershop;
  }

  static createAndAuthenticate(data: ICreateBarbershopFactory): {
    jwt: Jwt;
    barbershop: Barbershop;
  } {
    const barbershop = this.create(data);

    const jwt = Jwt.sign({
      id: barbershop.id,
      email: barbershop.email.value,
      name: barbershop.name.value,
      roles: ["barbershop"],
    });

    return {
      barbershop,
      jwt,
    };
  }
}
