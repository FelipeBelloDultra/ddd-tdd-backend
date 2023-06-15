import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Employee } from "@modules/employee/domain/employee/Employee";
import { ICreateEmployeeRepository } from "@modules/employee/application/repository/ICreateEmployeeRepository";
import { IFindByIdBarbershopRepository } from "@modules/barbershop/application/repository/IFindByIdBarbershopRepository";

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

interface ICreateEmployee {
  createEmployeeRepository: ICreateEmployeeRepository;
  findByIdBarbershopRepository: IFindByIdBarbershopRepository;
  emailValidatorService: EmailValidatorService;
}

export class CreateEmployee implements IUseCase<Input, Output> {
  private readonly createEmployeeRepository: ICreateEmployeeRepository;
  private readonly findByIdBarbershopRepository: IFindByIdBarbershopRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor({
    createEmployeeRepository,
    emailValidatorService,
    findByIdBarbershopRepository,
  }: ICreateEmployee) {
    this.createEmployeeRepository = createEmployeeRepository;
    this.findByIdBarbershopRepository = findByIdBarbershopRepository;
    this.emailValidatorService = emailValidatorService;
  }

  public async execute(data: Input): Promise<Output> {
    const email = Email.create(data.email);
    if (email.isLeft()) {
      return left(email.value);
    }

    const existingBarbershop = await this.findByIdBarbershopRepository.findById(
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

    const createdEmployee = await this.createEmployeeRepository.create(
      employee.value
    );

    return right(createdEmployee.id);
  }
}
