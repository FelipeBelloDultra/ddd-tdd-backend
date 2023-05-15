// Domain
import { Employee } from "~/domain/Employee";

// Repository interface
import { IEmployeeRepository } from "~/repositories/IEmployeeRepository";

interface IListEmployeeByBarbershopId {
  barbershopId: string;
}

export class ListEmployeeByBarbershopId {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  public async execute(data: IListEmployeeByBarbershopId): Promise<Employee[]> {
    const findedEmployee = await this.employeeRepository.findByBarbershopId(
      data.barbershopId
    );

    return findedEmployee;
  }
}
