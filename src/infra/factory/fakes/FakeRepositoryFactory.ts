import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { FakeBarbershopRepository } from "@modules/barbershop/application/repository/fakes/FakeBarbershopRepository";

import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { FakeEmployeeRepository } from "@modules/employee/application/repository/fakes/FakeEmployeeRepository";

import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { FakeAppointmentRepository } from "@modules/appointment/application/repository/fakes/FakeAppointmentRepository";

import { IClientRepository } from "@modules/client/application/repository/IClientRepository";
import { FakeClientRepository } from "@modules/client/application/repository/fakes/FakeClientRepository";

export class FakeRepositoryFactory implements IRepositoryFactory {
  static create() {
    const {
      createAppointmentRepository,
      createBarbershopRepository,
      createEmployeeRepository,
      createClientRepository,
    } = new FakeRepositoryFactory();

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
    return new FakeBarbershopRepository();
  }

  public createEmployeeRepository(): IEmployeeRepository {
    return new FakeEmployeeRepository();
  }

  public createAppointmentRepository(): IAppointmentRepository {
    return new FakeAppointmentRepository();
  }

  public createClientRepository(): IClientRepository {
    return new FakeClientRepository();
  }
}
