import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

export interface IUpdateBarbershopRepository {
  update: (data: Barbershop) => Promise<Barbershop>;
}
