import { Either, right, left } from "@core/logic/Either";

import { InvalidPhoneError } from "./errors/InvalidPhoneError";

export class Phone {
  private readonly phone: string;

  get value(): string {
    return this.phone;
  }

  private constructor(phone: string) {
    this.phone = phone;
  }

  static validate(phone: string): boolean {
    if (!phone || phone.trim().length > 255) {
      return false;
    }

    const regex =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})-?(\d{4}))$/;

    if (!regex.test(phone)) {
      return false;
    }

    return true;
  }

  static create(phone: string): Either<InvalidPhoneError, Phone> {
    if (!this.validate(phone)) {
      return left(new InvalidPhoneError(phone));
    }

    return right(new Phone(phone));
  }
}
