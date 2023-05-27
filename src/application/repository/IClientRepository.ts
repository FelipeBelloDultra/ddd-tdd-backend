import { Client } from "~/domain/entity/Client";

export interface IClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
}
