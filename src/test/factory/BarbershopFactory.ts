import { faker } from "@faker-js/faker";
import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { Name } from "@_shared/domain/Name";

export class BarbershopFactory {
  static create(): Barbershop {
    const barbershop = Barbershop.create({
      name: Name.create(faker.person.fullName()).value as Name,
      email: Email.create(faker.internet.email()).value as Email,
      password: Password.create(faker.internet.password({ length: 15 }))
        .value as Password,
    });

    return barbershop.value as Barbershop;
  }

  static createSome(quantity = 1): Barbershop[] {
    const barbershops: Barbershop[] = [];

    for (let index = 0; index < quantity; index++) {
      const barbershop = Barbershop.create({
        name: Name.create(faker.person.fullName()).value as Name,
        email: Email.create(faker.internet.email()).value as Email,
        password: Password.create(faker.internet.password({ length: 15 }))
          .value as Password,
      });

      barbershops.push(barbershop.value as Barbershop);
    }

    return barbershops;
  }
}
