import { prisma } from "@infra/prisma";

import { Client } from "@modules/client/domain/client/Client";
import { ClientMapper } from "@modules/client/application/mappers/ClientMapper";

import { IClientRepository } from "../IClientRepository";

export class PrismaClientRepository implements IClientRepository {
  public async create(data: Client): Promise<Client> {
    const toPersistence = await ClientMapper.toPersistence(data);

    await prisma.client.create({
      data: toPersistence,
    });

    return data;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const finded = await prisma.client.findUnique({
      where: { email },
    });

    if (!finded) return undefined;

    return ClientMapper.toDomain(finded);
  }

  public async findById(id: string): Promise<Client | undefined> {
    const finded = await prisma.client.findUnique({
      where: { id_client: id },
    });

    if (!finded) return undefined;

    return ClientMapper.toDomain(finded);
  }
}
