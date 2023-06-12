import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

export interface IFindAllInMonthFromEmployeeAppointmentRepository {
  findAllInMonthFromEmployee: (data: {
    month: number;
    year: number;
    employeeId: string;
  }) => Promise<Appointment[]>;
}
