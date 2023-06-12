import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

export interface IFindByIdBarbershopRepository {
  findById: (id: string) => Promise<Barbershop | undefined>;
}
