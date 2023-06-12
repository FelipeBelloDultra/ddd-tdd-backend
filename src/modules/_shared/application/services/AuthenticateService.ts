import { Either, right, left } from "@core/logic/Either";
import { Jwt } from "@core/domain/Jwt";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

import { EmailValidatorService } from "./EmailValidatorService";

interface IAuthenticationSignature {
  email: string;
  password: string;
}

export class AuthenticateService {
  private readonly emailValidatorService: EmailValidatorService;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.emailValidatorService = new EmailValidatorService({
      barbershopRepository: repositoryFactory.createBarbershopRepository(),
      employeeRepository: repositoryFactory.createEmployeeRepository(),
      clientRepository: repositoryFactory.createClientRepository(),
    });
  }

  public async authenticate(
    signature: IAuthenticationSignature,
    roles: Array<string>
  ): Promise<Either<InvalidEmailOrPasswordError, Jwt>> {
    const findedByEmail =
      await this.emailValidatorService.findByAuthenticatedEmail(
        signature.email
      );

    if (!findedByEmail) {
      return left(new InvalidEmailOrPasswordError());
    }

    const passwordIsValid = await findedByEmail.password.comparePassword(
      signature.password
    );

    if (!passwordIsValid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const jwt = Jwt.sign({
      id: findedByEmail.id,
      name: findedByEmail.name.value,
      email: signature.email,
      roles,
    });

    return right(jwt);
  }
}
