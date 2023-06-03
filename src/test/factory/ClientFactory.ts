import { faker } from "@faker-js/faker";
import { Client } from "@modules/client/domain/client/client";
import { Email } from "@_shared/domain/email";
import { Password } from "@_shared/domain/password";
import { Name } from "@_shared/domain/name";

export class ClientFactory {
  static create(): Client {
    const client = Client.create({
      name: Name.create(faker.person.fullName()).value as Name,
      email: Email.create(faker.internet.email()).value as Email,
      password: Password.create(faker.internet.password({ length: 15 }))
        .value as Password,
    });

    return client.value as Client;
  }

  static createSome(quantity = 1): Client[] {
    const clients: Client[] = [];

    for (let index = 0; index < quantity; index++) {
      const client = Client.create({
        name: Name.create(faker.person.fullName()).value as Name,
        email: Email.create(faker.internet.email()).value as Email,
        password: Password.create(faker.internet.password({ length: 15 }))
          .value as Password,
      });

      clients.push(client.value as Client);
    }

    return clients;
  }
}
