import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";

import { PrismaBarbershopRepository } from "@modules/barbershop/application/repository/prisma/PrismaBarbershopRepository";
import { PrismaEmployeeRepository } from "@modules/employee/application/repository/prisma/PrismaEmployeeRepository";
import { PrismaAppointmentRepository } from "@modules/appointment/application/repository/prisma/PrismaAppointmentRepository";
import { PrismaClientRepository } from "@modules/client/application/repository/prisma/PrismaClientRepository";

export class PrismaRepositoryFactory implements IRepositoryFactory {
  static create() {
    const {
      createAppointmentRepository,
      createBarbershopRepository,
      createEmployeeRepository,
      createClientRepository,
    } = new PrismaRepositoryFactory();

    const barbershopRepository = createBarbershopRepository();
    const employeeRepository = createEmployeeRepository();
    const appointmentRepository = createAppointmentRepository();
    const clientRepository = createClientRepository();

    return {
      barbershopRepository,
      employeeRepository,
      appointmentRepository,
      clientRepository,
    };
  }

  public createBarbershopRepository(): IBarbershopRepository {
    return new PrismaBarbershopRepository();
  }

  public createEmployeeRepository(): IEmployeeRepository {
    return new PrismaEmployeeRepository();
  }

  public createAppointmentRepository(): IAppointmentRepository {
    return new PrismaAppointmentRepository();
  }

  public createClientRepository(): IClientRepository {
    return new PrismaClientRepository();
  }
}
