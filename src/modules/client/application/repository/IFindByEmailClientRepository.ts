import { Client } from "@modules/client/domain/client/Client";

export interface IFindByEmailClientRepository {
  findByEmail: (email: string) => Promise<Client | undefined>;
}
