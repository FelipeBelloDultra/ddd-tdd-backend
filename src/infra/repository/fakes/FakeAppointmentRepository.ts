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
}
