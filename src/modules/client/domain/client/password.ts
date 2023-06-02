import bcryptjs from "bcryptjs";
import { Either, right, left } from "@core/logic/Either";
import { InvalidClientPasswordError } from "./errors/InvalidClientPasswordError";

export class Password {
  private readonly password: string;
  private readonly hashed?: boolean;

  private constructor(password: string, hashed: boolean) {
    this.password = password;
    this.hashed = hashed;
  }

  public async getHashedValue(): Promise<string> {
    if (this.hashed) {
      return this.password;
    }

    return bcryptjs.hash(this.password, 8);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    if (this.hashed) {
      return bcryptjs.compare(plainTextPassword, this.password);
    }

    return this.password === plainTextPassword;
  }

  static validate(password: string): boolean {
    if (
      !password ||
      password.trim().length < 6 ||
      password.trim().length > 255
    ) {
      return false;
    }

    return true;
  }

  static create(
    password: string,
    hashed = false
  ): Either<InvalidClientPasswordError, Password> {
    if (!hashed && !this.validate(password)) {
      return left(new InvalidClientPasswordError());
    }

    return right(new Password(password, hashed));
  }
}
