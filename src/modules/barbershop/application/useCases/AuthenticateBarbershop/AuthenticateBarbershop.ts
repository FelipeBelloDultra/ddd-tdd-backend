import { Either, left, right } from "@core/logic/Either";
import { Jwt } from "@core/domain/Jwt";
import { IUseCase } from "@core/application/useCases/IUseCase";
import { IPermissions } from "@core/domain/AvailablePermissions";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

interface Input {
  email: string;
  password: string;
}

type Output = Either<InvalidEmailOrPasswordError, Jwt>;

interface IAuthenticateBarbershop {
  authenticateService: AuthenticateService;
}

export class AuthenticateBarbershop implements IUseCase<Input, Output> {
  private readonly authenticateService: AuthenticateService;

  constructor({ authenticateService }: IAuthenticateBarbershop) {
    this.authenticateService = authenticateService;
  }

  public async execute(data: Input): Promise<Output> {
    const authenticated = await this.authenticateService.authenticate({
      signature: { email: data.email, password: data.password },
      permissions: [IPermissions.BARBERSHOP],
    });

    if (authenticated.isLeft()) {
      return left(authenticated.value);
    }

    return right(authenticated.value);
  }
}
