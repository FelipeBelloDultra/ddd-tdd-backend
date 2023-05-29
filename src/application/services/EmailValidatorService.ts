import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";
import { IClientRepository } from "~/application/repository/IClientRepository";

interface IEmailValidatorService {
  employeeRepository: IEmployeeRepository;
  barbershopRepository: IBarbershopRepository;
  clientRepository: IClientRepository;
}

export class EmailValidatorService {
  private readonly employeeRepository: IEmployeeRepository;
  private readonly barbershopRepository: IBarbershopRepository;
  private readonly clientRepository: IClientRepository;

  constructor(emailValidatorService: IEmailValidatorService) {
    this.employeeRepository = emailValidatorService.employeeRepository;
    this.barbershopRepository = emailValidatorService.barbershopRepository;
    this.clientRepository = emailValidatorService.clientRepository;
  }

  public async isUsed(email: string): Promise<boolean> {
    return (
      !!(await this.employeeRepository.findByEmail(email)) ||
      !!(await this.barbershopRepository.findByEmail(email)) ||
      !!(await this.clientRepository.findByEmail(email))
    );
  }
}
