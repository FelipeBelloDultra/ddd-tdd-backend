import { Client } from "~/domain/entity/Client";
import { IClientRepository } from "~/application/repository/IClientRepository";
import {
  ClientMapper,
  IPersistenceClient,
} from "~/application/mappers/ClientMapper";

export class FakeClientRepository implements IClientRepository {
  private readonly clients: IPersistenceClient[] = [];

  public async findById(id: string): Promise<Client | undefined> {
    const finded = this.clients.find((client) => client.id_client === id);

    if (!finded) return undefined;

    return Promise.resolve(ClientMapper.toDomain(finded));
  }
}
