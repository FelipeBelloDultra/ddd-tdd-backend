import { Either, left, right } from "@core/logic/Either";
import { Jwt } from "@core/domain/Jwt";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

interface Input {
  email: string;
  password: string;
}

type Output = Either<InvalidEmailOrPasswordError, Jwt>;

export class AuthenticateClient implements IUseCase<Input, Output> {
  constructor(private readonly authenticateService: AuthenticateService) {}

  public async execute(data: Input): Promise<Output> {
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
