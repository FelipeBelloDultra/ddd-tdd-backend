import { Client } from "@modules/client/domain/entity/Client";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { EmailValidatorService } from "@core/application/services/EmailValidatorService";

interface ICreateClient {
  name: string;
  email: string;
  password: string;
}

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

  public async execute(data: ICreateClient): Promise<string> {
    if (await this.emailValidatorService.isUsed(data.email))
      throw new Error("Email already registered");

    const client = Client.create(data);

    const createdClient = await this.clientRepository.create(client);

    return createdClient.id;
  }
}
