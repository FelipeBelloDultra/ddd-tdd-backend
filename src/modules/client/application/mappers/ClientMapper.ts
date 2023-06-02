import { Client } from "@modules/client/domain/Client";

export interface IPersistenceClient {
  id_client: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class ClientMapper {
  static toDomain(raw: IPersistenceClient): Client {
    const client = Client.create(
      {
        password: raw.password,
        name: raw.name,
        email: raw.email,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id_client
    );

    return client;
  }

  static toPersistence(client: Client): IPersistenceClient {
    return {
      id_client: client.id,
      name: client.name,
      email: client.email,
      password: client.password,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
    };
  }
}
