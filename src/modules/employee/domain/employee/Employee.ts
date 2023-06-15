import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Phone } from "@_shared/domain/Phone";
import { AvatarUrl } from "@_shared/domain/AvatarUrl";

import { InvalidEmployeeEmailError } from "./errors/InvalidEmployeeEmailError";
import { InvalidEmployeeNameError } from "./errors/InvalidEmployeeNameError";
import { InvalidEmployeePasswordError } from "./errors/InvalidEmployeePasswordError";

interface IEmployeeProps {
  name: Name;
  email: Email;
  phone: Phone;
  avatarUrl: AvatarUrl;
  barbershopId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Employee extends Entity<IEmployeeProps> {
  get name(): Name {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get phone(): Phone {
    return this.props.phone;
  }

  get avatarUrl(): AvatarUrl {
    return this.props.avatarUrl;
  }

  get barbershopId(): string {
    return this.props.barbershopId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: IEmployeeProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: IEmployeeProps,
    id?: string
  ): Either<
    | InvalidEmployeeEmailError
    | InvalidEmployeeNameError
    | InvalidEmployeePasswordError,
    Employee
  > {
    return right(new Employee(props, id));
  }
}
