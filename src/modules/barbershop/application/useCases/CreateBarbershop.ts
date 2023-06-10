import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { BarbershopEmailAlreadyUsedError } from "./errors/BarbershopEmailAlreadyUsedError";

interface Input {
  name: string;
  email: string;
  password: string;
}

type Output = Either<BarbershopEmailAlreadyUsedError, string>;

export class CreateBarbershop implements IUseCase<Input, Output> {
  private readonly barbershopRepository: IBarbershopRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor(repositoryFactory: IRepositoryFactory) {
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

    if (await this.emailValidatorService.isUsed(data.email)) {
      return left(new BarbershopEmailAlreadyUsedError());
    }

    const name = Name.create(data.name);
    if (name.isLeft()) {
      return left(name.value);
    }

    const password = Password.create(data.password);
    if (password.isLeft()) {
      return left(password.value);
    }

    const barbershop = Barbershop.create({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (barbershop.isLeft()) {
      return left(barbershop.value);
    }

    const createdBarbershop = await this.barbershopRepository.create(
      barbershop.value
    );

    return right(createdBarbershop.id);
  }
}
