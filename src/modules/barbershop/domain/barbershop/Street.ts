import { Either, right } from "@core/logic/Either";

export class Street {
  private readonly street: string;

  get value(): string {
    return this.street;
  }

  private constructor(street: string) {
    this.street = street;
  }

  static create(street: string): Either<void, Street> {
    return right(new Street(street));
  }
}
