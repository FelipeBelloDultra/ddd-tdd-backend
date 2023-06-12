import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

export interface ICreateAppointmentRepository {
  create: (data: Appointment) => Promise<Appointment>;
}
