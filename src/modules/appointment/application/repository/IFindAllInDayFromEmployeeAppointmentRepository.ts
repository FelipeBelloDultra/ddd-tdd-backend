import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

export interface IFindAllInDayFromEmployeeAppointmentRepository {
  findAllInDayFromEmployee: (data: {
    day: number;
    month: number;
    year: number;
    employeeId: string;
  }) => Promise<Appointment[]>;
}
