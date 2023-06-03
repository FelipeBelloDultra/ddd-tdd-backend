import { Either, right } from "@core/logic/Either";

export class Neighborhood {
  private readonly neighborhood: string;

  get value(): string {
    return this.neighborhood;
  }

  private constructor(neighborhood: string) {
    this.neighborhood = neighborhood;
  }

  static create(neighborhood: string): Either<void, Neighborhood> {
    return right(new Neighborhood(neighborhood));
  }
}
