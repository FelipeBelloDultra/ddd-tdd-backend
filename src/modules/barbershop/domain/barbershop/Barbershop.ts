import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";
import { Email } from "@_shared/domain/Email";
import { Name } from "@_shared/domain/Name";
import { Password } from "@_shared/domain/Password";
import { InvalidBarbershopEmailError } from "./errors/InvalidBarbershopEmailError";
import { InvalidBarbershopNameError } from "./errors/InvalidBarbershopNameError";
import { InvalidBarbershopPasswordError } from "./errors/InvalidBarbershopPasswordError";
import { InvalidBarbershopPhoneError } from "./errors/InvalidBarbershopPhoneError";
import { Street } from "./Street";
import { StreetNumber } from "./StreetNumber";
import { Neighborhood } from "./Neighborhood";
import { Phone } from "./Phone";
import { AvatarUrl } from "./AvatarUrl";

interface IBarbershopProps {
  name: Name;
  email: Email;
  password: Password;
  street?: Street;
  neighborhood?: Neighborhood;
  number?: StreetNumber;
  phone?: Phone;
  avatarUrl?: AvatarUrl;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IBarbershopUpdateProps {
  street?: Street;
  neighborhood?: Neighborhood;
  number?: StreetNumber;
  phone?: Phone;
  avatarUrl?: AvatarUrl;
}

export class Barbershop extends Entity<IBarbershopProps> {
  get name(): Name {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get street(): Street | undefined {
    return this.props.street;
  }

  get neighborhood(): Neighborhood | undefined {
    return this.props.neighborhood;
  }

  get number(): StreetNumber | undefined {
    return this.props.number;
  }

  get phone(): Phone | undefined {
    return this.props.phone;
  }

  get avatarUrl(): AvatarUrl | undefined {
    return this.props.avatarUrl;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private constructor(props: IBarbershopProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: IBarbershopProps,
    id?: string
  ): Either<
    | InvalidBarbershopEmailError
    | InvalidBarbershopNameError
    | InvalidBarbershopPasswordError
    | InvalidBarbershopPhoneError,
    Barbershop
  > {
    return right(new Barbershop(props, id));
  }

  public update(toUpdate: IBarbershopUpdateProps): Either<void, Barbershop> {
    const updated = new Barbershop(
      {
        name: this.name,
        email: this.email,
        password: this.password,
        avatarUrl: toUpdate.avatarUrl || this.avatarUrl,
        neighborhood: toUpdate.neighborhood || this.neighborhood,
        number: toUpdate.number || this.number,
        phone: toUpdate.phone || this.phone,
        street: toUpdate.street || this.street,
        createdAt: this.createdAt,
        updatedAt: new Date(),
      },
      this.id
    );

    return right(updated);
  }
}
