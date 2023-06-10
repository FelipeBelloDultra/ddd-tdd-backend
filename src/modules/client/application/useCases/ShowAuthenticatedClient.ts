import { Either, right, left } from "@core/logic/Either";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Client } from "@modules/client/domain/client/Client";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";

import { ClientNotFoundError } from "./errors/ClientNotFoundError";

interface Input {
  clientId: string;
}

type Output = Either<ClientNotFoundError, Client>;

export class ShowAuthenticatedClient implements IUseCase<Input, Output> {
  private readonly clientRepository: IClientRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.clientRepository = repositoryFactory.createClientRepository();
  }

  public async execute({ clientId }: Input): Promise<Output> {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      return left(new ClientNotFoundError());
    }

    return right(client);
  }
}
