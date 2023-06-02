import { Entity } from "@core/domain/Entity";

interface IBarbershopProps {
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

export class Barbershop extends Entity<IBarbershopProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get street(): string | undefined {
    return this.props.street;
  }

  get neighborhood(): string | undefined {
    return this.props.neighborhood;
  }

  get number(): string | undefined {
    return this.props.number;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  get avatarUrl(): string | undefined {
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

  public static create(props: IBarbershopProps, id?: string): Barbershop {
    return new Barbershop(props, id);
  }
}
