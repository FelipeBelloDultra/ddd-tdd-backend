import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

export interface IFindByEmailBarbershopRepository {
  findByEmail: (email: string) => Promise<Barbershop | undefined>;
}
