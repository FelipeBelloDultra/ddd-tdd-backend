import { Client } from "~/domain/entity/Client";

export interface IClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
  findByEmail: (email: string) => Promise<Client | undefined>;
  create: (data: Client) => Promise<Client>;
}
