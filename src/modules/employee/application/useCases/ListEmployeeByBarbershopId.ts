import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Employee } from "@modules/employee/domain/employee/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";

interface Input {
  barbershopId: string;
}

type Output = Either<void, Employee[]>;

export class ListEmployeeByBarbershopId implements IUseCase<Input, Output> {
  private readonly employeeRepository: IEmployeeRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(data: Input): Promise<Output> {
    const findedEmployee = await this.employeeRepository.findByBarbershopId(
      data.barbershopId
    );

    return right(findedEmployee);
  }
}
