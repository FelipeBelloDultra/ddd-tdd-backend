import { Either, right, left } from "@core/logic/Either";
import { Jwt } from "@core/domain/Jwt";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

import { EmailValidatorService } from "./EmailValidatorService";

interface IAuthenticationSignature {
  email: string;
  password: string;
}

interface IAuthenticateService {
  emailValidatorService: EmailValidatorService;
}

export class AuthenticateService {
  private readonly emailValidatorService: EmailValidatorService;

  constructor({ emailValidatorService }: IAuthenticateService) {
    this.emailValidatorService = emailValidatorService;
  }

  public async authenticate(
    signature: IAuthenticationSignature,
    roles: string
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
