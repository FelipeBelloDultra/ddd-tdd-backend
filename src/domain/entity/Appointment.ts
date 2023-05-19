import { randomUUID } from "crypto";

interface IAppointmentProps {
  employeeId: string;
  clientId: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Appointment {
  readonly _id: string;
  readonly employeeId: string;
  readonly clientId: string;
  readonly date: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(props: IAppointmentProps, _id?: string) {
    this._id = _id || randomUUID();
    this.employeeId = props.employeeId;
    this.clientId = props.clientId;
    this.date = props.date;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
