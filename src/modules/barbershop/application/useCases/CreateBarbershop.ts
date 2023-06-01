import { Barbershop } from "@modules/barbershop/domain/entity/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { EmailValidatorService } from "@core/application/services/EmailValidatorService";

interface ICreateBarbershop {
  name: string;
  email: string;
  password: string;
}

export class CreateBarbershop {
  private readonly barbershopRepository: IBarbershopRepository;
  private readonly emailValidatorService: EmailValidatorService;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();

    this.emailValidatorService = new EmailValidatorService({
      barbershopRepository: repositoryFactory.createBarbershopRepository(),
      employeeRepository: repositoryFactory.createEmployeeRepository(),
      clientRepository: repositoryFactory.createClientRepository(),
    });
  }

  public async execute(data: ICreateBarbershop): Promise<string> {
    if (await this.emailValidatorService.isUsed(data.email))
      throw new Error("Email already registered");

    const barbershop = Barbershop.create(data);

    const createdBarbershop = await this.barbershopRepository.create(
      barbershop
    );

    return createdBarbershop.id;
  }
}
