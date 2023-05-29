import { IClientRepository } from "../repository/IClientRepository";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";
import { Client } from "~/domain/entity/Client";
import { EmailValidatorService } from "../services/EmailValidatorService";

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
