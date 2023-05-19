// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

// Repository interface
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";

// Factory
import { IRepositoryFactory } from "../factory/IRepositoryFactory";

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

    const updatedUser = await this.barbershopRepository.update({
      ...data,
    });

    return new Barbershop(updatedUser, updatedUser._id);
  }
}
