import { Either, right } from "@core/logic/Either";
import { Entity } from "@core/domain/Entity";

import { Employee } from "@modules/employee/domain/employee/Employee";
import { Client } from "@modules/client/domain/client/Client";

import { AppointmentDate } from "./AppointmentDate";

import { InvalidAppointmentDateError } from "./errors/InvalidAppointmentDateError";

interface IAppointmentProps {
  employeeId: string;
  employee?: Employee;
  clientId: string;
  client?: Client;
  date: AppointmentDate;
}

export class Appointment extends Entity<IAppointmentProps> {
  get employeeId(): string {
    return this.props.employeeId;
  }

  get employee(): Employee | undefined {
    return this.props.employee;
  }

  get clientId(): string {
    return this.props.clientId;
  }

  get client(): Client | undefined {
    return this.props.client;
  }

  get date(): AppointmentDate {
    return this.props.date;
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
