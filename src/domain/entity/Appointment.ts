import { Entity } from "./base/Entity";

interface IAppointmentProps {
  employeeId: string;
  clientId: string;
  date: Date;
}

export class Appointment extends Entity<IAppointmentProps> {
  get employeeId(): string {
    return this.props.employeeId;
  }

  get clientId(): string {
    return this.props.clientId;
  }

  get date(): Date {
    return this.props.date;
  }

  private constructor(props: IAppointmentProps, id?: string) {
    super(props, id);
  }

  public static create(props: IAppointmentProps, id?: string): Appointment {
    return new Appointment(props, id);
  }
}
