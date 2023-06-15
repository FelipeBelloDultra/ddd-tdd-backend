import { Client } from "@modules/client/domain/client/Client";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";
import {
  ClientMapper,
  IPersistenceClient,
} from "@modules/client/application/mappers/ClientMapper";

export class FakeClientRepository implements IClientRepository {
  private readonly clients: IPersistenceClient[] = [];

  public async findById(id: string): Promise<Client | undefined> {
    const finded = this.clients.find((client) => client.id_client === id);

    if (!finded) return undefined;

    return Promise.resolve(ClientMapper.toDomain(finded));
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const finded = this.clients.find((client) => (client.email = email));

    if (!finded) return undefined;

    return Promise.resolve(ClientMapper.toDomain(finded));
  }

  public async create(data: Client): Promise<Client> {
    const toPersistence = await ClientMapper.toPersistence(data);

    this.clients.push(toPersistence);

    return Promise.resolve(data);
  }
}
