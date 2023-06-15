import { Client as IPersistenceClient } from "@prisma/client";

import { Client } from "@modules/client/domain/client/Client";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";

export { IPersistenceClient };
export class ClientMapper {
  static toDomain(raw: IPersistenceClient): Client {
    const name = Name.create(raw.name);
    if (name.isLeft()) {
      throw new Error("Name value is invalid");
    }

    const email = Email.create(raw.email);
    if (email.isLeft()) {
      throw new Error("Email value is invalid");
    }

    const password = Password.create(raw.password, true);
    if (password.isLeft()) {
      throw new Error("Password value is invalid");
    }

    const client = Client.create(
      {
        name: name.value,
        email: email.value,
        password: password.value,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id_client
    );

    return client.value as Client;
  }

  static async toPersistence(client: Client): Promise<IPersistenceClient> {
    const hashedPassword = await client.password.getHashedValue();

    return {
      id_client: client.id,
      name: client.name.value,
      email: client.email.value,
      password: hashedPassword,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    };
  }
}
