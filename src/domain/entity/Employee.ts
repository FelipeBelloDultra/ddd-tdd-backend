import { Entity } from "./core/Entity";

interface IEmployeeProps {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Employee extends Entity<IEmployeeProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get avatarUrl(): string {
    return this.props.avatarUrl;
  }

  get barbershopId(): string {
    return this.props.barbershopId;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private constructor(props: IEmployeeProps, id?: string) {
    super(props, id);
  }

  public static create(props: IEmployeeProps, id?: string): Employee {
    return new Employee(props, id);
  }
}
