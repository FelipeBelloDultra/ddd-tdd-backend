// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

export interface IBarbershopRepository {
  create: (data: Barbershop) => Promise<Barbershop>;
  findByEmail: (email: string) => Promise<Barbershop | undefined>;
  findById: (id: string) => Promise<Barbershop | undefined>;
  update: (data: Barbershop) => Promise<Barbershop>;
}
