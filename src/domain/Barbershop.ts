// Packages
import { randomUUID } from "node:crypto";

interface IBarbershopProps {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatarUrl?: string;
}

export class Barbershop {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly address?: string;
  readonly phone?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly avatarUrl?: string;

  constructor(props: IBarbershopProps, _id?: string) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.address = props.address;
    this.phone = props.phone;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = new Date();
    this.avatarUrl = props.avatarUrl;
    this._id = _id || randomUUID();
  }
}
