import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class UnavailableHoursError extends Error implements UseCaseError {
  constructor() {
    super("Hour is not available");
    this.name = UnavailableHoursError.name;
  }
}
