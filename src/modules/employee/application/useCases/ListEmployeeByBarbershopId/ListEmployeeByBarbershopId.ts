import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Employee } from "@modules/employee/domain/employee/Employee";
import { IFindByBarbershopIdEmployeeRepository } from "@modules/employee/application/repository/IFindByBarbershopIdEmployeeRepository";

interface Input {
  barbershopId: string;
}

type Output = Either<void, Employee[]>;

interface IListEmployeeByBarbershopId {
  findByBarbershopIdEmployeeRepository: IFindByBarbershopIdEmployeeRepository;
}

export class ListEmployeeByBarbershopId implements IUseCase<Input, Output> {
  private readonly findByBarbershopIdEmployeeRepository: IFindByBarbershopIdEmployeeRepository;

  constructor({
    findByBarbershopIdEmployeeRepository,
  }: IListEmployeeByBarbershopId) {
    this.findByBarbershopIdEmployeeRepository =
      findByBarbershopIdEmployeeRepository;
  }

  public async execute(data: Input): Promise<Output> {
    const findedEmployee =
      await this.findByBarbershopIdEmployeeRepository.findByBarbershopId(
        data.barbershopId
      );

    return right(findedEmployee);
  }
}
