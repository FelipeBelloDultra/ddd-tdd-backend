import { IBarbershopRepository } from "../repository/IBarbershopRepository";
import { IEmployeeRepository } from "../repository/IEmployeeRepository";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";

export interface IRepositoryFactory {
  createBarbershopRepository: () => IBarbershopRepository;
  createEmployeeRepository: () => IEmployeeRepository;
  createAppointmentRepository: () => IAppointmentRepository;
}
