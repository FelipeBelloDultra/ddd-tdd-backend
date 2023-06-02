import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidClientPasswordError extends Error implements DomainError {
  constructor() {
    super("The password must have between 6 and 255 characters.");
    this.name = InvalidClientPasswordError.name;
  }
}
