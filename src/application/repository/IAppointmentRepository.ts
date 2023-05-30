import { Appointment } from "~/domain/entity/Appointment";

export interface IAppointmentRepository {
  create: (data: Appointment) => Promise<Appointment>;
  findByDate: (
    date: Date,
    employeeId: string
  ) => Promise<Appointment | undefined>;
  findAllInMonthFromEmployee: ({
    month,
    year,
    employeeId,
  }: {
    month: number;
    year: number;
    employeeId: string;
  }) => Promise<Appointment[]>;
}
