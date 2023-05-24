import { Appointment } from "~/domain/entity/Appointment";
import { IAppointmentRepository } from "~/application/repository/IAppointmentRepository";
import { AppointmentMapper } from "~/application/mappers/AppointmentMapper";

export class FakeAppointmentRepository implements IAppointmentRepository {
  private readonly appointments: {
    id_appointment: string;
    employee_id: string;
    client_id: string;
    date: Date;
    created_at?: Date;
    updated_at?: Date;
  }[] = [];

  public async create(data: Appointment): Promise<Appointment> {
    this.appointments.push(AppointmentMapper.toPersistence(data));

    return data;
  }
}
