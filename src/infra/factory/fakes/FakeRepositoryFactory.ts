import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";
import { IRepositoryFactory } from "~/application/factory/IRepositoryFactory";
import { FakeBarbershopRepository } from "~/infra/repository/fakes/FakeBarbershopRepository";
import { FakeEmployeeRepository } from "~/infra/repository/fakes/FakeEmployeeRepository";

export class FakeRepositoryFactory implements IRepositoryFactory {
  public createBarbershopRepository(): IBarbershopRepository {
    return new FakeBarbershopRepository();
  }

  public createEmployeeRepository(): IEmployeeRepository {
    return new FakeEmployeeRepository();
  }
}
