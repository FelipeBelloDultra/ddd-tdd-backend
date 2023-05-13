// Domain
import { Barbershop } from "~/domain/Barbershop";

// Repository interface
import {
  IBarbershopRepository,
  ICraeteBarbershop,
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
}
