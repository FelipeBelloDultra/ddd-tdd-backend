import { IBarbershopRepository } from "../repository/IBarbershopRepository";
import { IEmployeeRepository } from "../repository/IEmployeeRepository";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";
import { IClientRepository } from "../repository/IClientRepository";

export interface IRepositoryFactory {
  createBarbershopRepository: () => IBarbershopRepository;
  createEmployeeRepository: () => IEmployeeRepository;
  createAppointmentRepository: () => IAppointmentRepository;
  createClientRepository: () => IClientRepository;
}
