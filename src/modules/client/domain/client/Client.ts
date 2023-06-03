import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";

import { InvalidClientNameError } from "./errors/InvalidClientNameError";
import { InvalidClientEmailError } from "./errors/InvalidClientEmailError";
import { InvalidClientPasswordError } from "./errors/InvalidClientPasswordError";

interface IClientProps {
  name: Name;
  email: Email;
  password: Password;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client extends Entity<IClientProps> {
  get name(): Name {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
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

  public static create(
    props: IClientProps,
    id?: string
  ): Either<
    | InvalidClientNameError
    | InvalidClientEmailError
    | InvalidClientPasswordError,
    Client
  > {
    return right(new Client(props, id));
  }
}
