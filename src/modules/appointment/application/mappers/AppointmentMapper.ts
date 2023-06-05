import { Appointment } from "@modules/appointment/domain/appointment/Appointment";
import { AppointmentDate } from "@modules/appointment/domain/appointment/AppointmentDate";

export interface IPersistenceAppointment {
  id_appointment: string;
  employee_id: string;
  client_id: string;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class AppointmentMapper {
  static toDomain(raw: IPersistenceAppointment): Appointment {
    const date = AppointmentDate.create(raw.date);
    if (date.isLeft()) {
      throw new Error("Appointment date is invalid");
    }

    const appointment = Appointment.create(
      {
        employeeId: raw.employee_id,
        clientId: raw.client_id,
        date: date.value,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id_appointment
    );

    return appointment.value as Appointment;
  }

  static toPersistence(appointment: Appointment): IPersistenceAppointment {
    return {
      id_appointment: appointment.id,
      employee_id: appointment.employeeId,
      client_id: appointment.clientId,
      date: appointment.date.value,
      created_at: appointment.createdAt,
      updated_at: appointment.updatedAt,
    };
  }
}
