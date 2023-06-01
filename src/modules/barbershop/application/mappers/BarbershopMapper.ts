import { Barbershop } from "@modules/barbershop/domain/entity/Barbershop";

export interface IPersistenceBarbershop {
  id_barbershop: string;
  name: string;
  email: string;
  password: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BarbershopMapper {
  static toDomain(raw: IPersistenceBarbershop): Barbershop {
    const barbershop = Barbershop.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        avatarUrl: raw.avatarUrl,
        neighborhood: raw.neighborhood,
        number: raw.number,
        phone: raw.phone,
        street: raw.street,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id_barbershop
    );

    return barbershop;
  }

  static toPersistence(barbershop: Barbershop): IPersistenceBarbershop {
    return {
      id_barbershop: barbershop.id,
      name: barbershop.name,
      email: barbershop.email,
      password: barbershop.password,
      avatarUrl: barbershop.avatarUrl,
      neighborhood: barbershop.neighborhood,
      number: barbershop.number,
      phone: barbershop.phone,
      street: barbershop.street,
      createdAt: barbershop.createdAt,
      updatedAt: barbershop.updatedAt,
    };
  }
}
