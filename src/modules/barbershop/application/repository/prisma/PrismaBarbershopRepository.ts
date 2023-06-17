import { queries } from "@infra/database/queries";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { IBarbershopRepository } from "../IBarbershopRepository";

export class PrismaBarbershopRepository implements IBarbershopRepository {
  public async create(data: Barbershop): Promise<Barbershop> {
    const toPersistence = await BarbershopMapper.toPersistence(data);

    await queries.barbershop.create({
      data: toPersistence,
    });

    return data;
  }

  public async findByEmail(email: string): Promise<Barbershop | undefined> {
    const finded = await queries.barbershop.findUnique({
      where: { email },
    });

    if (!finded) return undefined;

    return BarbershopMapper.toDomain(finded);
  }

  public async findById(id: string): Promise<Barbershop | undefined> {
    const finded = await queries.barbershop.findUnique({
      where: { id_barbershop: id },
    });

    if (!finded) return undefined;

    return BarbershopMapper.toDomain(finded);
  }

  public async update(data: Barbershop): Promise<Barbershop> {
    const toPersistence = await BarbershopMapper.toPersistence(data);

    const updated = await queries.barbershop.update({
      where: {
        id_barbershop: toPersistence.id_barbershop,
      },
      data: toPersistence,
    });

    return BarbershopMapper.toDomain(updated);
  }
}
