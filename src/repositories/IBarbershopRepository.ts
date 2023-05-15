// Domain
import { Barbershop } from "~/domain/Barbershop";
export interface ICraeteBarbershop {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUpdateBarbershop {
  id: string;
  name?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBarbershopRepository {
  create: (data: ICraeteBarbershop) => Promise<Barbershop>;
  findByEmail: (email: string) => Promise<Barbershop | undefined>;
  findById: (id: string) => Promise<Barbershop | undefined>;
  update: (data: IUpdateBarbershop) => Promise<Barbershop>;
}
