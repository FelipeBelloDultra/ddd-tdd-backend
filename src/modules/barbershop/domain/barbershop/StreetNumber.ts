import { Either, right } from "@core/logic/Either";

export class StreetNumber {
  private readonly streetNumber: string;

  get value(): string {
    return this.streetNumber;
  }

  private constructor(streetNumber: string) {
    this.streetNumber = streetNumber;
  }

  static create(streetNumber: string): Either<void, StreetNumber> {
    return right(new StreetNumber(streetNumber));
  }
}
