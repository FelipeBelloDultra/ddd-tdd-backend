import { sign, verify } from "jsonwebtoken";

import { Either, right, left } from "@core/logic/Either";

import { InvalidJwtTokenError } from "./errors/InvalidJwtTokenError";

interface ISignature {
  id: string;
  name?: string;
  email?: string;
  roles: Array<string>;
}

interface IJwtProps {
  authenticatedId: string;
  token: string;
}

interface IJwtPayload extends ISignature {
  exp: number;
}

const EXPIRES_IN = "1d";
const KEY = "key";

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
        roles: signature.roles,
      },
      KEY,
      {
        expiresIn: EXPIRES_IN,
      }
    );

    return new Jwt({
      authenticatedId: signature.id,
      token,
    });
  }

  static decodeToken(token: string): Either<InvalidJwtTokenError, IJwtPayload> {
    try {
      const decoded = verify(token, KEY) as IJwtPayload;

      return right(decoded);
    } catch (error) {
      return left(new InvalidJwtTokenError());
    }
  }
}
