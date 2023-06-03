import { Either, left, right } from "@core/logic/Either";
import { Client } from "@modules/client/domain/client/client";
import { Name } from "@_shared/domain/name";
import { Email } from "@_shared/domain/email";
import { Password } from "@_shared/domain/password";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";
import { InvalidClientEmailError } from "@modules/client/domain/client/errors/InvalidClientEmailError";
import { InvalidClientNameError } from "@modules/client/domain/client/errors/InvalidClientNameError";
import { InvalidClientPasswordError } from "@modules/client/domain/client/errors/InvalidClientPasswordError";
import { ClientEmailAlreadyUsedError } from "./errors/ClientEmailAlreadyUsedError";

interface ICreateClient {
  name: string;
  email: string;
  password: string;
}

type ICreateClientResponse = Either<
  | InvalidClientEmailError
  | InvalidClientNameError
  | InvalidClientPasswordError
  | ClientEmailAlreadyUsedError,
  string
>;

export class CreateClient {
  private readonly clientRepository: IClientRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.clientRepository = repositoryFactory.createClientRepository();

    this.emailValidatorService = new EmailValidatorService({
      barbershopRepository: repositoryFactory.createBarbershopRepository(),
      employeeRepository: repositoryFactory.createEmployeeRepository(),
      clientRepository: repositoryFactory.createClientRepository(),
    });
  }

  public async execute(data: ICreateClient): Promise<ICreateClientResponse> {
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

    const createdClient = await this.clientRepository.create(client.value);

    return right(createdClient.id);
  }
}
