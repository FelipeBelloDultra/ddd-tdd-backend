import { Either, right, left } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { IFindByIdBarbershopRepository } from "@modules/barbershop/application/repository/IFindByIdBarbershopRepository";

import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

interface Input {
  barbershopId: string;
}

type Output = Either<BarbershopNotFoundError, Barbershop>;

interface IShowAuthenticatedBarbershop {
  findByIdBarbershopRepository: IFindByIdBarbershopRepository;
}

export class ShowAuthenticatedBarbershop implements IUseCase<Input, Output> {
  private readonly findByIdBarbershopRepository: IFindByIdBarbershopRepository;

  constructor({ findByIdBarbershopRepository }: IShowAuthenticatedBarbershop) {
    this.findByIdBarbershopRepository = findByIdBarbershopRepository;
  }

  public async execute({ barbershopId }: Input): Promise<Output> {
    const barbershop = await this.findByIdBarbershopRepository.findById(
      barbershopId
    );

    if (!barbershop) {
      return left(new BarbershopNotFoundError());
    }

    return right(barbershop);
  }
}
