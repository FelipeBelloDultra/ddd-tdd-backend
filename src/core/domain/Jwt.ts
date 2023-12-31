import { sign, verify } from "jsonwebtoken";

import authConfig from "@config/auth";

import { Either, right, left } from "@core/logic/Either";

import { InvalidJwtTokenError } from "./errors/InvalidJwtTokenError";

interface ISignature {
  id: string;
  name?: string;
  email?: string;
  permissions: Array<string>;
}

interface IJwtProps {
  authenticatedId: string;
  token: string;
}

interface IJwtPayload extends ISignature {
  exp: number;
}

export class Jwt {
  readonly authenticatedId: string;
  readonly token: string;

  private constructor({ authenticatedId, token }: IJwtProps) {
    this.authenticatedId = authenticatedId;
    this.token = token;
  }

  static sign(signature: ISignature): Jwt {
    const token = sign(
      {
        id: signature.id,
        email: signature.email,
        name: signature.name,
        permissions: signature.permissions,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    return new Jwt({
      authenticatedId: signature.id,
      token,
    });
  }

  static decodeToken(token: string): Either<InvalidJwtTokenError, IJwtPayload> {
    try {
      const decoded = verify(token, authConfig.secret) as IJwtPayload;

      return right(decoded);
    } catch (error) {
      return left(new InvalidJwtTokenError());
    }
  }
}
