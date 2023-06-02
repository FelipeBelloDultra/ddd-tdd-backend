import { Appointment } from "@modules/appointment/domain/Appointment";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import {
  AppointmentMapper,
  IPersistenceAppointment,
} from "@modules/appointment/application/mappers/AppointmentMapper";

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

  public async findAllInMonthFromEmployee(data: {
    month: number;
    year: number;
    employeeId: string;
  }): Promise<Appointment[]> {
    const filtred = this.appointments.filter(
      (appointment) => (
        appointment.employee_id === data.employeeId,
        appointment.date.getMonth() + 1 === data.month,
        appointment.date.getFullYear() === data.year
      )
    );

    const appointments = filtred.map(AppointmentMapper.toDomain);

    return appointments;
  }

  public async findAllInDayFromEmployee(data: {
    day: number;
    month: number;
    year: number;
    employeeId: string;
  }): Promise<Appointment[]> {
    const filtred = this.appointments.filter(
      (appointment) => (
        appointment.employee_id === data.employeeId,
        appointment.date.getMonth() + 1 === data.month,
        appointment.date.getFullYear() === data.year,
        appointment.date.getDate() === data.day
      )
    );

    const appointments = filtred.map(AppointmentMapper.toDomain);

    return appointments;
  }
}
