// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

// Interfaces
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";

export class FakeBarbershopRepository implements IBarbershopRepository {
  private readonly barbershops: Barbershop[] = [];

  public async create(data: Barbershop): Promise<Barbershop> {
    const barbershop = new Barbershop(data, data._id);

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

  public async update(data: Barbershop): Promise<Barbershop> {
    const finded = this.barbershops.findIndex(
      (barbershop) => barbershop._id === data._id
    );

    const updated = new Barbershop(data, data._id);

    this.barbershops[finded] = updated;

    return updated;
  }
}
