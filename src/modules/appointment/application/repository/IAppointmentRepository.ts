import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

import { IFindAllInDayFromEmployeeAppointmentRepository } from "./IFindAllInDayFromEmployeeAppointmentRepository";
import { IFindAllInMonthFromEmployeeAppointmentRepository } from "./IFindAllInMonthFromEmployeeAppointmentRepository";

export interface IAppointmentRepository
  extends IFindAllInDayFromEmployeeAppointmentRepository,
    IFindAllInMonthFromEmployeeAppointmentRepository {
  create: (data: Appointment) => Promise<Appointment>;
  findByDate: (
    date: Date,
    employeeId: string
  ) => Promise<Appointment | undefined>;
  findAllInMonthFromEmployee: (data: {
    month: number;
    year: number;
    employeeId: string;
  }) => Promise<Appointment[]>;
  findAllInDayFromEmployee: (data: {
    day: number;
    month: number;
    year: number;
    employeeId: string;
  }) => Promise<Appointment[]>;
}
