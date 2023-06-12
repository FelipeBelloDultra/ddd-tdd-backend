import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { Client } from "@modules/client/domain/client/Client";
import { IFindByEmailClientRepository } from "@modules/client/application/repository/IFindByEmailClientRepository";

interface IEmailValidatorService {
  employeeRepository: IEmployeeRepository;
  barbershopRepository: IBarbershopRepository;
  clientRepository: IFindByEmailClientRepository;
}

export class EmailValidatorService {
  private readonly employeeRepository: IEmployeeRepository;
  private readonly barbershopRepository: IBarbershopRepository;
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
