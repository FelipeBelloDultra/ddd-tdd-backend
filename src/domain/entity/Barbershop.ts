import { Entity } from "./base/Entity";

interface IBarbershopProps {
  name: string;
  email: string;
  password: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
}

export class Barbershop extends Entity<IBarbershopProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.name;
  }

  get password(): string {
    return this.props.name;
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

  private constructor(props: IBarbershopProps, id?: string) {
    super(props, id);
  }

  public static create(props: IBarbershopProps, id?: string): Barbershop {
    return new Barbershop(props, id);
  }
}
