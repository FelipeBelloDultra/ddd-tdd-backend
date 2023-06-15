import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class ClientEmailAlreadyUsedError extends Error implements UseCaseError {
  constructor() {
    super("Email already registered");
    this.name = ClientEmailAlreadyUsedError.name;
  }
}
