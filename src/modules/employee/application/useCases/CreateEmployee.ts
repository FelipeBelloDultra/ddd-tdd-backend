import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";

import { Employee } from "@modules/employee/domain/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { EmployeeEmailAlreadyUsedError } from "./errors/EmployeeEmailAlreadyUsedError";
import { EmployeeBarbershopNotFoundError } from "./errors/EmployeeBarbershopNotFoundError";

interface ICreateEmployee {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
}

type ICreateEmployeeResponse = Either<
  EmployeeBarbershopNotFoundError | EmployeeEmailAlreadyUsedError,
  string
>;

export class CreateEmployee {
  private readonly employeeRepository: IEmployeeRepository;
  private readonly barbershopRepository: IBarbershopRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();

    this.emailValidatorService = new EmailValidatorService({
      barbershopRepository: repositoryFactory.createBarbershopRepository(),
      employeeRepository: repositoryFactory.createEmployeeRepository(),
      clientRepository: repositoryFactory.createClientRepository(),
    });
  }

  public async execute(
    data: ICreateEmployee
  ): Promise<ICreateEmployeeResponse> {
    const existingBarbershop = await this.barbershopRepository.findById(
      data.barbershopId
    );

    if (!existingBarbershop) return left(new EmployeeBarbershopNotFoundError());

    if (await this.emailValidatorService.isUsed(data.email)) {
      return left(new EmployeeEmailAlreadyUsedError());
    }

    const employee = Employee.create({
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
      barbershopId: data.barbershopId,
      phone: data.phone,
    });

    const createdEmployee = await this.employeeRepository.create(employee);

    return right(createdEmployee.id);
  }
}
