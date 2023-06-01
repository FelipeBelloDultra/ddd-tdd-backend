import { Employee } from "@modules/employee/domain/entity/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

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
