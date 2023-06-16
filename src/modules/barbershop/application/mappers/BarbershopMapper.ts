import { Barbershop as IPrismaBarbershop } from "@prisma/client";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { Neighborhood } from "@modules/barbershop/domain/barbershop/Neighborhood";
import { Street } from "@modules/barbershop/domain/barbershop/Street";
import { StreetNumber } from "@modules/barbershop/domain/barbershop/StreetNumber";

import { Phone } from "@_shared/domain/Phone";
import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { AvatarUrl } from "@_shared/domain/AvatarUrl";

export type IPersistenceBarbershop = Omit<
  IPrismaBarbershop,
  "created_at" | "updated_at"
>;

export class BarbershopMapper {
  static toDomain(raw: IPersistenceBarbershop): Barbershop {
    const name = Name.create(raw.name);
    if (name.isLeft()) {
      throw new Error("Name value is invalid");
    }

    const email = Email.create(raw.email);
    if (email.isLeft()) {
      throw new Error("Email value is invalid");
    }

    const password = Password.create(raw.password, true);
    if (password.isLeft()) {
      throw new Error("Password value is invalid");
    }

    const avatarUrl = raw.avatar_url
      ? AvatarUrl.create(raw.avatar_url)
      : undefined;
    if (avatarUrl?.isLeft()) {
      throw new Error("AvatarUrl value is invalid");
    }

    const neighborhood = raw.neighborhood
      ? Neighborhood.create(raw.neighborhood)
      : undefined;
    if (neighborhood?.isLeft()) {
      throw new Error("Neighborhood value is invalid");
    }

    const streetNumber = raw.number
      ? StreetNumber.create(raw.number)
      : undefined;
    if (streetNumber?.isLeft()) {
      throw new Error("StreetNumber value is invalid");
    }

    const phone = raw.phone ? Phone.create(raw.phone) : undefined;
    if (phone?.isLeft()) {
      throw new Error("Phone value is invalid");
    }

    const street = raw.street ? Street.create(raw.street) : undefined;
    if (street?.isLeft()) {
      throw new Error("Street value is invalid");
    }

    const barbershop = Barbershop.create(
      {
        name: name.value,
        email: email.value,
        password: password.value,
        avatarUrl: (avatarUrl?.value as AvatarUrl) || undefined,
        neighborhood: (neighborhood?.value as Neighborhood) || undefined,
        number: (streetNumber?.value as StreetNumber) || undefined,
        phone: (phone?.value as Phone) || undefined,
        street: (street?.value as Street) || undefined,
      },
      raw.id_barbershop
    );

    return barbershop.value as Barbershop;
  }

  static async toPersistence(
    barbershop: Barbershop
  ): Promise<IPersistenceBarbershop> {
    const hashedPassword = await barbershop.password.getHashedValue();

    return {
      id_barbershop: barbershop.id,
      name: barbershop.name.value,
      email: barbershop.email.value,
      password: hashedPassword,
      avatar_url: barbershop.avatarUrl?.value || null,
      neighborhood: barbershop.neighborhood?.value || null,
      number: barbershop.number?.value || null,
      phone: barbershop.phone?.value || null,
      street: barbershop.street?.value || null,
    };
  }
}
