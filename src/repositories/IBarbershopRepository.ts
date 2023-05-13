// Domain
import { Barbershop } from "~/domain/Barbershop";

export interface ICraeteBarbershop {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IBarbershopRepository {
  create: (data: ICraeteBarbershop) => Promise<Barbershop>;
  findByEmail: (email: string) => Promise<Barbershop | undefined>;
}
