// Interfaces
import { IBarbershopRepository } from "~/repositories/IBarbershopRepository";
import { IEmployeeRepository } from "~/repositories/IEmployeeRepository";

export class EmailValidator {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly barbershopRepository: IBarbershopRepository
  ) {}

  public async isEmailAlreadyUsed(
    email: string,
    barbershopId?: string
  ): Promise<boolean> {
    const usedEmailByBarbershop = await this.barbershopRepository.findByEmail(
      email
    );
    if (
      usedEmailByBarbershop &&
      (!barbershopId || usedEmailByBarbershop._id !== barbershopId)
    ) {
      return true;
    }

    const usedEmailByEmployee = await this.employeeRepository.findByEmail(
      email
    );
    if (usedEmailByEmployee) return true;

    return false;
  }
}
