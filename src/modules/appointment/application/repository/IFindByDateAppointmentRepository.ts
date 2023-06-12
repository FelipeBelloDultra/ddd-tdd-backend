import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

export interface IFindByDateAppointmentRepository {
  findByDate: (
    date: Date,
    employeeId: string
  ) => Promise<Appointment | undefined>;
}
