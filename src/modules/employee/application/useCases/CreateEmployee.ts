import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Employee } from "@modules/employee/domain/employee/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";
import { AvatarUrl } from "@_shared/domain/AvatarUrl";
import { Phone } from "@_shared/domain/Phone";
import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";

import { EmployeeEmailAlreadyUsedError } from "./errors/EmployeeEmailAlreadyUsedError";
import { EmployeeBarbershopNotFoundError } from "./errors/EmployeeBarbershopNotFoundError";

interface Input {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
}

type Output = Either<
  EmployeeBarbershopNotFoundError | EmployeeEmailAlreadyUsedError,
  string
>;

export class CreateEmployee implements IUseCase<Input, Output> {
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

  public async execute(data: Input): Promise<Output> {
    const email = Email.create(data.email);
    if (email.isLeft()) {
      return left(email.value);
    }

    const existingBarbershop = await this.barbershopRepository.findById(
      data.barbershopId
    );

    if (!existingBarbershop) return left(new EmployeeBarbershopNotFoundError());

    if (await this.emailValidatorService.isUsed(email.value.value)) {
      return left(new EmployeeEmailAlreadyUsedError());
    }

    const name = Name.create(data.name);
    if (name.isLeft()) {
      return left(name.value);
    }

    const phone = Phone.create(data.phone);
    if (phone.isLeft()) {
      return left(phone.value);
    }

    const avatarUrl = AvatarUrl.create(data.avatarUrl).value as AvatarUrl;

    const employee = Employee.create({
      name: name.value,
      email: email.value,
      avatarUrl: avatarUrl,
      phone: phone.value,
      barbershopId: data.barbershopId,
    });

    if (employee.isLeft()) {
      return left(employee.value);
    }

    const createdEmployee = await this.employeeRepository.create(
      employee.value
    );

    return right(createdEmployee.id);
  }
}
