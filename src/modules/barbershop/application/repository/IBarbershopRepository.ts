import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { IFindByIdBarbershopRepository } from "./IFindByIdBarbershopRepository";
import { ICreateBarbershopRepository } from "./ICreateBarbershopRepository";
import { IUpdateBarbershopRepository } from "./IUpdateBarbershopRepository";
import { IFindByEmailBarbershopRepository } from "./IFindByEmailBarbershopRepository";

export interface IBarbershopRepository
  extends IFindByIdBarbershopRepository,
    ICreateBarbershopRepository,
    IUpdateBarbershopRepository,
    IFindByEmailBarbershopRepository {
  create: (data: Barbershop) => Promise<Barbershop>;
  findByEmail: (email: string) => Promise<Barbershop | undefined>;
  findById: (id: string) => Promise<Barbershop | undefined>;
  update: (data: Barbershop) => Promise<Barbershop>;
}
