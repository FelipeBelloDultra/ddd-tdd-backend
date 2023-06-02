import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class EmployeeBarbershopNotFoundError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("Barbershop does not exist");
    this.name = EmployeeBarbershopNotFoundError.name;
  }
}
