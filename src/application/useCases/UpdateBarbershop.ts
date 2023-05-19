import { Barbershop } from "~/domain/entity/Barbershop";
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
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

    const barbershop = new Barbershop(findedbyId, findedbyId._id);

    const updatedUser = await this.barbershopRepository.update({
      _id: barbershop._id,
      email: barbershop.email,
      name: barbershop.name,
      password: barbershop.password,
      ...data,
    });

    return new Barbershop(updatedUser, updatedUser._id);
  }
}
