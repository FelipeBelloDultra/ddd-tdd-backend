import { Either, left, right } from "@core/logic/Either";
import { Jwt } from "@core/domain/Jwt";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

interface IAuthenticateClient {
  email: string;
  password: string;
}

type IAuthenticateClientResponse = Either<InvalidEmailOrPasswordError, Jwt>;

export class AuthenticateClient {
  private readonly authenticateService: AuthenticateService;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.authenticateService = new AuthenticateService(repositoryFactory);
  }

  public async execute(
    data: IAuthenticateClient
  ): Promise<IAuthenticateClientResponse> {
    const authenticated = await this.authenticateService.authenticate(
      { email: data.email, password: data.password },
      ["client"]
    );

    if (authenticated.isLeft()) {
      return left(authenticated.value);
    }

    return right(authenticated.value);
  }
}
