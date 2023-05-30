import { Appointment } from "~/domain/entity/Appointment";
import { IAppointmentRepository } from "~/application/repository/IAppointmentRepository";
import {
  AppointmentMapper,
  IPersistenceAppointment,
} from "~/application/mappers/AppointmentMapper";

export class FakeAppointmentRepository implements IAppointmentRepository {
  private readonly appointments: IPersistenceAppointment[] = [];

  public async create(data: Appointment): Promise<Appointment> {
    this.appointments.push(AppointmentMapper.toPersistence(data));

    return Promise.resolve(data);
  }

  public async findByDate(
    date: Date,
    employeeId: string
  ): Promise<Appointment | undefined> {
    const finded = this.appointments.find((appointment) => {
      return (
        appointment.date.getTime() === date.getTime() &&
        appointment.employee_id === employeeId
      );
    });

    if (!finded) return undefined;

    return Promise.resolve(AppointmentMapper.toDomain(finded));
  }

  public async findAllInMonthFromEmployee({
    month,
    year,
    employeeId,
  }: {
    month: number;
    year: number;
    employeeId: string;
  }): Promise<Appointment[]> {
    const filtred = this.appointments.filter(
      (appointment) => (
        appointment.employee_id === employeeId,
        appointment.date.getMonth() + 1 === month,
        appointment.date.getFullYear() === year
      )
    );

    const appointments = filtred.map(AppointmentMapper.toDomain);

    return appointments;
  }
}
