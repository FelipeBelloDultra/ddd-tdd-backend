import { Either, right, left } from "@core/logic/Either";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";

import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

interface IShowAuthenticatedBarbershop {
  barbershopId: string;
}

type IShowAuthenticatedBarbershopResponse = Either<
  BarbershopNotFoundError,
  Barbershop
>;

export class ShowAuthenticatedBarbershop {
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
  }

  public async execute({
    barbershopId,
  }: IShowAuthenticatedBarbershop): Promise<IShowAuthenticatedBarbershopResponse> {
    const barbershop = await this.barbershopRepository.findById(barbershopId);

    if (!barbershop) {
      return left(new BarbershopNotFoundError());
    }

    return right(barbershop);
  }
}
