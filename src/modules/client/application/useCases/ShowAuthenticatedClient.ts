import { Either, right, left } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Client } from "@modules/client/domain/client/Client";
import { IFindByIdClientRepository } from "@modules/client/application/repository/IFindByIdClientRepository";

import { ClientNotFoundError } from "./errors/ClientNotFoundError";

interface Input {
  clientId: string;
}

type Output = Either<ClientNotFoundError, Client>;

interface IShowAuthenticatedClient {
  findByIdClientRepository: IFindByIdClientRepository;
}

export class ShowAuthenticatedClient implements IUseCase<Input, Output> {
  private readonly findByIdClientRepository: IFindByIdClientRepository;

  constructor({ findByIdClientRepository }: IShowAuthenticatedClient) {
    this.findByIdClientRepository = findByIdClientRepository;
  }

  public async execute({ clientId }: Input): Promise<Output> {
    const client = await this.findByIdClientRepository.findById(clientId);

    if (!client) {
      return left(new ClientNotFoundError());
    }

    return right(client);
  }
}
