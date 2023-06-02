import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class BarbershopEmailAlreadyUsedError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Email already registered");
    this.name = BarbershopEmailAlreadyUsedError.name;
  }
}
