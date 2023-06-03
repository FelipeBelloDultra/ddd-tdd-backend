import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, right } from "@core/logic/Either";

import { Employee } from "@modules/employee/domain/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";

interface IListEmployeeByBarbershopId {
  barbershopId: string;
}

type ListEmployeeByBarbershopIdResponse = Either<void, Employee[]>;

export class ListEmployeeByBarbershopId {
  private readonly employeeRepository: IEmployeeRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(
    data: IListEmployeeByBarbershopId
  ): Promise<ListEmployeeByBarbershopIdResponse> {
    const findedEmployee = await this.employeeRepository.findByBarbershopId(
      data.barbershopId
    );

    return right(findedEmployee);
  }
}
