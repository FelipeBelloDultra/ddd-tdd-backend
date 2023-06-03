import { Client } from "@modules/client/domain/client/Client";

import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { Name } from "@_shared/domain/Name";

import { BaseFactory } from "@test/factory/BaseFactory";

export class ClientFactory {
  static create(): Client {
    const client = Client.create({
      name: Name.create(BaseFactory.makeFullName()).value as Name,
      email: Email.create(BaseFactory.makeEmail()).value as Email,
      password: Password.create(BaseFactory.makePassword()).value as Password,
    });

    return client.value as Client;
  }
}
