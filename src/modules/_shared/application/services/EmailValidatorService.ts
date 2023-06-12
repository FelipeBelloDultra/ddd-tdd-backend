import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { Client } from "@modules/client/domain/client/Client";
import { IFindByEmailBarbershopRepository } from "@modules/barbershop/application/repository/IFindByEmailBarbershopRepository";
import { IFindByEmailEmployeeRepository } from "@modules/employee/application/repository/IFindByEmailEmployeeRepository";
import { IFindByEmailClientRepository } from "@modules/client/application/repository/IFindByEmailClientRepository";

interface IEmailValidatorService {
  employeeRepository: IFindByEmailEmployeeRepository;
  barbershopRepository: IFindByEmailBarbershopRepository;
  clientRepository: IFindByEmailClientRepository;
}

export class EmailValidatorService {
  private readonly employeeRepository: IFindByEmailEmployeeRepository;
  private readonly barbershopRepository: IFindByEmailBarbershopRepository;
  private readonly clientRepository: IFindByEmailClientRepository;

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

  public async findByAuthenticatedEmail(
    email: string
  ): Promise<Client | Barbershop | undefined> {
    return (
      (await this.barbershopRepository.findByEmail(email)) ||
      (await this.clientRepository.findByEmail(email))
    );
  }
}
