import { Either, right, left } from "@core/logic/Either";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";

import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

interface Input {
  barbershopId: string;
}

type Output = Either<BarbershopNotFoundError, Barbershop>;

export class ShowAuthenticatedBarbershop implements IUseCase<Input, Output> {
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
  }

  public async execute({ barbershopId }: Input): Promise<Output> {
    const barbershop = await this.barbershopRepository.findById(barbershopId);

    if (!barbershop) {
      return left(new BarbershopNotFoundError());
    }

    return right(barbershop);
  }
}
