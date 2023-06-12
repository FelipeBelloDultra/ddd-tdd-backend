import { Client } from "@modules/client/domain/client/Client";

export interface ICreateClientRepository {
  create: (data: Client) => Promise<Client>;
}
