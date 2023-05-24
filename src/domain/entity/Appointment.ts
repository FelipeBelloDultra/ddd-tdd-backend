import { Entity } from "./base/Entity";

interface IAppointmentProps {
  employeeId: string;
  clientId: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Appointment extends Entity<IAppointmentProps> {
  private START_WORK_TIME = 8;
  private END_WORK_TIME = 17;

  get employeeId(): string {
    return this.props.employeeId;
  }

  get clientId(): string {
    return this.props.clientId;
  }

  get date(): Date {
    return this.props.date;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private constructor(props: IAppointmentProps, id?: string) {
    super(props, id);
  }

  public static create(props: IAppointmentProps, id?: string): Appointment {
    return new Appointment(props, id);
  }

  public hourIsAvailable(): boolean {
    const hours = this.date.getHours();

    if (this.date.getTime() < new Date().getTime()) return false;

    if (hours < this.START_WORK_TIME || hours > this.END_WORK_TIME) {
      return false;
    }

    return true;
  }
}
