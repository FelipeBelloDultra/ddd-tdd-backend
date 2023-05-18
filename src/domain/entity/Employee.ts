// Packages
import { randomUUID } from "node:crypto";

interface IEmployeeProps {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Employee {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly avatarUrl: string;
  readonly barbershopId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(props: IEmployeeProps, _id?: string) {
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.avatarUrl = props.avatarUrl;
    this.barbershopId = props.barbershopId;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = new Date();
    this._id = _id || randomUUID();
  }
}
