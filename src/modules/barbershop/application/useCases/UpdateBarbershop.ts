import { Barbershop } from "@modules/barbershop/domain/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";
import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

interface IUpdateBarbershop {
  id: string;
  name?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
}

type IUpdateBarbershopResponse = Either<BarbershopNotFoundError, Barbershop>;

export class UpdateBarbershop {
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
  }

  public async execute(
    data: IUpdateBarbershop
  ): Promise<IUpdateBarbershopResponse> {
    const findedbyId = await this.barbershopRepository.findById(data.id);

    if (!findedbyId) return left(new BarbershopNotFoundError());

    const barbershop = Barbershop.create(
      {
        email: findedbyId.email,
        password: findedbyId.password,
        name: findedbyId.name,
        createdAt: findedbyId.createdAt,
        ...data,
      },
      findedbyId.id
    );

    const updatedUser = await this.barbershopRepository.update(barbershop);

    return right(updatedUser);
  }
}
