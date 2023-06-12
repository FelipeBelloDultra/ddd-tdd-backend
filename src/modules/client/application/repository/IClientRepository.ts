import { Client } from "@modules/client/domain/client/Client";

import { ICreateClientRepository } from "./ICreateClientRepository";
import { IFindByIdClientRepository } from "./IFindByIdClientRepository";
import { IFindByEmailClientRepository } from "./IFindByEmailClientRepository";

export interface IClientRepository
  extends ICreateClientRepository,
    IFindByIdClientRepository,
    IFindByEmailClientRepository {
  findById: (id: string) => Promise<Client | undefined>;
  findByEmail: (email: string) => Promise<Client | undefined>;
  create: (data: Client) => Promise<Client>;
}
