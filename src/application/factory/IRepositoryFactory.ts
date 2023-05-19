import { IBarbershopRepository } from "../repository/IBarbershopRepository";
import { IEmployeeRepository } from "../repository/IEmployeeRepository";

export interface IRepositoryFactory {
  createBarbershopRepository: () => IBarbershopRepository;
  createEmployeeRepository: () => IEmployeeRepository;
}
