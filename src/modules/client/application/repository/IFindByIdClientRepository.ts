import { Client } from "@modules/client/domain/client/Client";

export interface IFindByIdClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
}
