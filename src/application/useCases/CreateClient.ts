import { IClientRepository } from "../repository/IClientRepository";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";
import { Client } from "~/domain/entity/Client";

interface ICreateClient {
  name: string;
  email: string;
  password: string;
}

export class CreateClient {
  private readonly clientRepository: IClientRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.clientRepository = repositoryFactory.createClientRepository();
  }

  public async execute(data: ICreateClient): Promise<string> {
    const usedEamil = await this.clientRepository.findByEmail(data.email);

    if (usedEamil) throw new Error("Email already registered");

    const client = Client.create(data);

    const createdClient = await this.clientRepository.create(client);

    return createdClient.id;
  }
}
