import { IRepositoryFactory } from "~/application/factory/IRepositoryFactory";
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";
import { IAppointmentRepository } from "~/application/repository/IAppointmentRepository";
import { FakeBarbershopRepository } from "~/infra/repository/fakes/FakeBarbershopRepository";
import { FakeEmployeeRepository } from "~/infra/repository/fakes/FakeEmployeeRepository";
import { FakeAppointmentRepository } from "~/infra/repository/fakes/FakeAppointmentRepository";

export class FakeRepositoryFactory implements IRepositoryFactory {
  static create() {
    const {
      createAppointmentRepository,
      createBarbershopRepository,
      createEmployeeRepository,
    } = new FakeRepositoryFactory();

    const barbershopRepository = createBarbershopRepository();
    const employeeRepository = createEmployeeRepository();
    const appointmentRepository = createAppointmentRepository();

    return {
      barbershopRepository,
      employeeRepository,
      appointmentRepository,
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
}
