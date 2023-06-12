import { Client } from "@modules/client/domain/client/Client";
import { ICreateClientRepository } from "./ICreateClientRepository";

export interface IClientRepository extends ICreateClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
  findByEmail: (email: string) => Promise<Client | undefined>;
  create: (data: Client) => Promise<Client>;
}
