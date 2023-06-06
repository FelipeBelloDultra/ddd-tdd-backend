import { Either, right, left } from "@core/logic/Either";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

import { Client } from "@modules/client/domain/client/Client";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";

import { ClientNotFoundError } from "./errors/ClientNotFoundError";

interface IShowAuthenticatedClient {
  clientId: string;
}

type IShowAuthenticatedClientResponse = Either<ClientNotFoundError, Client>;

export class ShowAuthenticatedClient {
  private readonly clientRepository: IClientRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.clientRepository = repositoryFactory.createClientRepository();
  }

  public async execute({
    clientId,
  }: IShowAuthenticatedClient): Promise<IShowAuthenticatedClientResponse> {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      return left(new ClientNotFoundError());
    }

    return right(client);
  }
}
