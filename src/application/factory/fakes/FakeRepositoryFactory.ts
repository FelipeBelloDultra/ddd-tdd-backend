import { IBarbershopRepository } from "../../repository/IBarbershopRepository";
import { IEmployeeRepository } from "../../repository/IEmployeeRepository";
import { FakeBarbershopRepository } from "../../repository/fakes/FakeBarbershopRepository";
import { FakeEmployeeRepository } from "../../repository/fakes/FakeEmployeeRepository";
import { IRepositoryFactory } from "../IRepositoryFactory";

export class FakeRepositoryFactory implements IRepositoryFactory {
  public createBarbershopRepository(): IBarbershopRepository {
    return new FakeBarbershopRepository();
  }

  public createEmployeeRepository(): IEmployeeRepository {
    return new FakeEmployeeRepository();
  }
}
