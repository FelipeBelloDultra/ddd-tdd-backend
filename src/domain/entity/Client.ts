import { Entity } from "./base/Entity";

interface IClientProps {
  name: string;
  email: string;
  password: string;
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

  private constructor(props: IClientProps, id?: string) {
    super(props, id);
  }

  public static create(props: IClientProps, id?: string): Client {
    return new Client(props, id);
  }
}
