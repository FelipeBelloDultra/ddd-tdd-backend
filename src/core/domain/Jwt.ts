import { sign, verify } from "jsonwebtoken";

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

const EXPIRES_IN = "1d";
const KEY = "key";

export class Jwt {
  readonly authenticatedId: string;
  readonly token: string;

  private constructor({ authenticatedId, token }: IJwtProps) {
    this.authenticatedId = authenticatedId;
    this.token = token;
  }

  static sign(signature: ISignature) {
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

  static decodeToken(token: string) {
    try {
      const decoded = verify(token, KEY);

      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
