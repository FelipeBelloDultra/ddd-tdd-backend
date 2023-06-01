import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";

export interface IRepositoryFactory {
  createBarbershopRepository: () => IBarbershopRepository;
  createEmployeeRepository: () => IEmployeeRepository;
  createAppointmentRepository: () => IAppointmentRepository;
  createClientRepository: () => IClientRepository;
}
