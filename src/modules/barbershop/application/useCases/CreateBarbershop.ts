import { Barbershop } from "@modules/barbershop/domain/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";
import { BarbershopEmailAlreadyUsedError } from "./errors/BarbershopEmailAlreadyUsedError";

interface ICreateBarbershop {
  name: string;
  email: string;
  password: string;
}

type ICreateBarbershopResponse = Either<
  BarbershopEmailAlreadyUsedError,
  string
>;

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

  public async execute(
    data: ICreateBarbershop
  ): Promise<ICreateBarbershopResponse> {
    if (await this.emailValidatorService.isUsed(data.email)) {
      return left(new BarbershopEmailAlreadyUsedError());
    }

    const barbershop = Barbershop.create(data);

    const createdBarbershop = await this.barbershopRepository.create(
      barbershop
    );

    return right(createdBarbershop.id);
  }
}
