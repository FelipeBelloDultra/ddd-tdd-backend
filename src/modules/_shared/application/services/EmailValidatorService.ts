import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IClientRepository } from "@modules/client/application/repository/IClientRepository";
import { Client } from "@modules/client/domain/client/Client";
import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

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

  public async findByEmail(
    email: string
  ): Promise<Client | Barbershop | undefined> {
    return (
      (await this.barbershopRepository.findByEmail(email)) ||
      (await this.clientRepository.findByEmail(email))
    );
  }
}
