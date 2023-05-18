// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

// Interfaces
import {
  IBarbershopRepository,
  ICraeteBarbershop,
  IUpdateBarbershop,
} from "../IBarbershopRepository";

export class FakeBarbershopRepository implements IBarbershopRepository {
  constructor(private readonly barbershops: Barbershop[] = []) {}

  public async create(data: ICraeteBarbershop): Promise<Barbershop> {
    const barbershop = new Barbershop(data, data.id);

    this.barbershops.push(barbershop);

    return barbershop;
  }

  public async findByEmail(email: string): Promise<Barbershop | undefined> {
    const finded = this.barbershops.find(
      (barbershop) => barbershop.email === email
    );

    return finded;
  }

  public async findById(id: string): Promise<Barbershop | undefined> {
    const finded = this.barbershops.find((barbershop) => barbershop._id === id);

    return finded;
  }

  public async update(data: IUpdateBarbershop): Promise<Barbershop> {
    const finded = this.barbershops.findIndex(
      (barbershop) => barbershop._id === data.id
    );

    const updated = new Barbershop(
      {
        email: this.barbershops[finded].email,
        password: this.barbershops[finded].password,
        name: this.barbershops[finded].name,
        ...data,
      },
      data.id
    );

    this.barbershops[finded] = updated;

    return updated;
  }
}
