import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class BarbershopNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Barbershop does not exist");
    this.name = BarbershopNotFoundError.name;
  }
}
