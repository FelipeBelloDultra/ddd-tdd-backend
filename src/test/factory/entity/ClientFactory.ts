import { Client } from "@modules/client/domain/client/Client";

import { Jwt } from "@core/domain/Jwt";
import { IPermissions } from "@core/domain/AvailablePermissions";

import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { Name } from "@_shared/domain/Name";

import { BaseFactory } from "@test/factory/BaseFactory";

interface ICreateClientFactory {
  name?: string;
  email?: string;
  password?: string;
}
export class ClientFactory {
  static create(data: ICreateClientFactory): Client {
    const client = Client.create({
      name: Name.create(data.name || BaseFactory.makeFullName()).value as Name,
      email: Email.create(data.email || BaseFactory.makeEmail()).value as Email,
      password: Password.create(data.password || BaseFactory.makePassword())
        .value as Password,
    });

    return client.value as Client;
  }

  static createAndAuthenticate(data: ICreateClientFactory): {
    jwt: Jwt;
    client: Client;
  } {
    const client = this.create(data);

    const jwt = Jwt.sign({
      id: client.id,
      email: client.email.value,
      name: client.name.value,
      permissions: [IPermissions.CLIENT],
    });

    return {
      client,
      jwt,
    };
  }
}
