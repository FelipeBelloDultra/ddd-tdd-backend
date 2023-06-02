import { Entity } from "@core/domain/Entity";

interface IClientProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client extends Entity<IClientProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private constructor(props: IClientProps, id?: string) {
    super(props, id);
  }

  public static create(props: IClientProps, id?: string): Client {
    return new Client(props, id);
  }
}
