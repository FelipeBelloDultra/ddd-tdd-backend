import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class ClientNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Client does not exist");
    this.name = ClientNotFoundError.name;
  }
}
