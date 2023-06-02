import { Barbershop } from "@modules/barbershop/domain/Barbershop";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";

interface IUpdateBarbershop {
  id: string;
  name?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
}

export class UpdateBarbershop {
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
  }

  public async execute(data: IUpdateBarbershop): Promise<Barbershop> {
    const findedbyId = await this.barbershopRepository.findById(data.id);

    if (!findedbyId) throw new Error("User does not exist");

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

    return updatedUser;
  }
}
