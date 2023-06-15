import { Either, right } from "@core/logic/Either";
import { Entity } from "@core/domain/Entity";

import { AppointmentDate } from "./AppointmentDate";

import { InvalidAppointmentDateError } from "./errors/InvalidAppointmentDateError";

interface IAppointmentProps {
  employeeId: string;
  clientId: string;
  date: AppointmentDate;
  createdAt: Date;
  updatedAt: Date;
}

export class Appointment extends Entity<IAppointmentProps> {
  get employeeId(): string {
    return this.props.employeeId;
  }

  get clientId(): string {
    return this.props.clientId;
  }

  get date(): AppointmentDate {
    return this.props.date;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private constructor(props: IAppointmentProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: IAppointmentProps,
    id?: string
  ): Either<InvalidAppointmentDateError, Appointment> {
    return right(new Appointment(props, id));
  }
}
