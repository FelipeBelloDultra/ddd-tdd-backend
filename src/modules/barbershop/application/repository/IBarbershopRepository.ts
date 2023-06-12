import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { IFindByIdBarbershopRepository } from "./IFindByIdBarbershopRepository";

export interface IBarbershopRepository extends IFindByIdBarbershopRepository {
  create: (data: Barbershop) => Promise<Barbershop>;
  findByEmail: (email: string) => Promise<Barbershop | undefined>;
  findById: (id: string) => Promise<Barbershop | undefined>;
  update: (data: Barbershop) => Promise<Barbershop>;
}
