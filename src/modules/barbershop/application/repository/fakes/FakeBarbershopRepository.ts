import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import {
  BarbershopMapper,
  IPersistenceBarbershop,
} from "@modules/barbershop/application/mappers/BarbershopMapper";

export class FakeBarbershopRepository implements IBarbershopRepository {
  private readonly barbershops: IPersistenceBarbershop[] = [];

  public async create(data: Barbershop): Promise<Barbershop> {
    const toPersistence = await BarbershopMapper.toPersistence(data);

    this.barbershops.push(toPersistence);

    return Promise.resolve(data);
  }

  public async findByEmail(email: string): Promise<Barbershop | undefined> {
    const finded = this.barbershops.find(
      (barbershop) => barbershop.email === email
    );

    if (!finded) return undefined;

    return Promise.resolve(BarbershopMapper.toDomain(finded));
  }

  public async findById(id: string): Promise<Barbershop | undefined> {
    const finded = this.barbershops.find(
      (barbershop) => barbershop.id_barbershop === id
    );

    if (!finded) return undefined;

    return Promise.resolve(BarbershopMapper.toDomain(finded));
  }

  public async update(data: Barbershop): Promise<Barbershop> {
    const finded = this.barbershops.findIndex(
      (barbershop) => barbershop.id_barbershop === data.id
    );

    this.barbershops[finded] = await BarbershopMapper.toPersistence(data);

    return data;
  }
}
