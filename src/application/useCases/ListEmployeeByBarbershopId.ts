// Domain
import { Employee } from "~/domain/entity/Employee";

// Repository interface
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";

// Factory
import { IRepositoryFactory } from "../factory/IRepositoryFactory";

interface IListEmployeeByBarbershopId {
  barbershopId: string;
}

export class ListEmployeeByBarbershopId {
  private readonly employeeRepository: IEmployeeRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(data: IListEmployeeByBarbershopId): Promise<Employee[]> {
    const findedEmployee = await this.employeeRepository.findByBarbershopId(
      data.barbershopId
    );

    return findedEmployee;
  }
}
