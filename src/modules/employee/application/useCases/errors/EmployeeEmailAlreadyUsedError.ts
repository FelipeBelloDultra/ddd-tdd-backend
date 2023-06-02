import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class EmployeeEmailAlreadyUsedError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Email already registered");
    this.name = EmployeeEmailAlreadyUsedError.name;
  }
}
