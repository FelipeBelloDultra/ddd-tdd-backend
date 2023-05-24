import { Appointment } from "~/domain/entity/Appointment";

interface IAppointment {
  id_appointment: string;
  employee_id: string;
  client_id: string;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class AppointmentMapper {
  static toDomain(raw: IAppointment): Appointment {
    const appointment = Appointment.create(
      {
        employeeId: raw.employee_id,
        clientId: raw.client_id,
        date: raw.date,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id_appointment
    );

    return appointment;
  }

  static toPersistence(appointment: Appointment): IAppointment {
    return {
      id_appointment: appointment.id,
      employee_id: appointment.employeeId,
      client_id: appointment.clientId,
      date: appointment.date,
      created_at: appointment.createdAt,
      updated_at: appointment.updatedAt,
    };
  }
}
