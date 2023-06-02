import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class EmployeeNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Employee not found");
    this.name = EmployeeNotFoundError.name;
  }
}
