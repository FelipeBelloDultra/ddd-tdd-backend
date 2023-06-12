import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

export interface ICreateBarbershopRepository {
  create: (data: Barbershop) => Promise<Barbershop>;
}
