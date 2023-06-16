import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { ICreateBarbershopRepository } from "@modules/barbershop/application/repository/ICreateBarbershopRepository";
import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { BarbershopEmailAlreadyUsedError } from "./errors/BarbershopEmailAlreadyUsedError";

interface Input {
  name: string;
  email: string;
  password: string;
}

type Output = Either<BarbershopEmailAlreadyUsedError, string>;

interface ICreateBarbershop {
  createBarbershopRepository: ICreateBarbershopRepository;
  emailValidatorService: EmailValidatorService;
}

export class CreateBarbershop implements IUseCase<Input, Output> {
  private readonly createBarbershopRepository: ICreateBarbershopRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor({
    createBarbershopRepository,
    emailValidatorService,
  }: ICreateBarbershop) {
    this.createBarbershopRepository = createBarbershopRepository;
    this.emailValidatorService = emailValidatorService;
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

    const createdBarbershop = await this.createBarbershopRepository.create(
      barbershop.value
    );

    return right(createdBarbershop.id);
  }
}
