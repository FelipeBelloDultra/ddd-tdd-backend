import { randomUUID } from "crypto";

interface IClientProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(props: IClientProps, _id?: string) {
    this._id = _id || randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
