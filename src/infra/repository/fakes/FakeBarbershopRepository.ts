import { Barbershop } from "~/domain/entity/Barbershop";
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
import { BarbershopMapper } from "~/application/mappers/BarbershopMapper";

export class FakeBarbershopRepository implements IBarbershopRepository {
  private readonly barbershops: {
    id_barbershop: string;
    name: string;
    email: string;
    password: string;
    street?: string;
    neighborhood?: string;
    number?: string;
    phone?: string;
    avatarUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }[] = [];

  public async create(data: Barbershop): Promise<Barbershop> {
    this.barbershops.push(BarbershopMapper.toPersistence(data));

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

    this.barbershops[finded] = BarbershopMapper.toPersistence(data);

    return Promise.resolve(Barbershop.create(data, data.id));
  }
}
