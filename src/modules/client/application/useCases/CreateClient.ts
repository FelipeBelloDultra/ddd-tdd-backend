import { Client } from "@modules/client/domain/Client";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { EmailValidatorService } from "@core/application/services/EmailValidatorService";
import { Either, left, right } from "@core/logic/Either";
import { ClientEmailAlreadyUsedError } from "./errors/ClientEmailAlreadyUsedError";

interface ICreateClient {
  name: string;
  email: string;
  password: string;
}

type ICreateClientResponse = Either<ClientEmailAlreadyUsedError, string>;

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
    if (await this.emailValidatorService.isUsed(data.email)) {
      return left(new ClientEmailAlreadyUsedError());
    }

    const client = Client.create(data);

    const createdClient = await this.clientRepository.create(client);

    return right(createdClient.id);
  }
}
