import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Name } from "@_shared/domain/Name";
import { Email } from "@_shared/domain/Email";
import { Password } from "@_shared/domain/Password";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { Client } from "@modules/client/domain/client/Client";
import { ICreateClientRepository } from "@modules/client/application/repository/ICreateClientRepository";

import { ClientEmailAlreadyUsedError } from "./errors/ClientEmailAlreadyUsedError";

interface Input {
  name: string;
  email: string;
  password: string;
}

type Output = Either<ClientEmailAlreadyUsedError, string>;

interface ICreateClient {
  createClientRepository: ICreateClientRepository;
  emailValidatorService: EmailValidatorService;
}

export class CreateClient implements IUseCase<Input, Output> {
  private readonly createClientRepository: ICreateClientRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor({
    createClientRepository,
    emailValidatorService,
  }: ICreateClient) {
    this.createClientRepository = createClientRepository;
    this.emailValidatorService = emailValidatorService;
  }

  public async execute(data: Input): Promise<Output> {
    const email = Email.create(data.email);
    if (email.isLeft()) {
      return left(email.value);
    }

    if (await this.emailValidatorService.isUsed(data.email)) {
      return left(new ClientEmailAlreadyUsedError());
    }

    const name = Name.create(data.name);
    if (name.isLeft()) {
      return left(name.value);
    }

    const password = Password.create(data.password);
    if (password.isLeft()) {
      return left(password.value);
    }

    const client = Client.create({
      email: email.value,
      name: name.value,
      password: password.value,
    });

    if (client.isLeft()) {
      return left(client.value);
    }

    const createdClient = await this.createClientRepository.create(
      client.value
    );

    return right(createdClient.id);
  }
}
