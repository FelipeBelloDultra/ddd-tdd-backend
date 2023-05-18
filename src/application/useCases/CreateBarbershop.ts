// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

// Repository interface
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";

interface ICreateBarbershop {
  name: string;
  email: string;
  password: string;
}

export class CreateBarbershop {
  constructor(private readonly barbershopRepository: IBarbershopRepository) {}

  public async execute(data: ICreateBarbershop): Promise<string> {
    const barbershop = new Barbershop(data);

    const findedByEmail = await this.barbershopRepository.findByEmail(
      barbershop.email
    );

    if (findedByEmail) throw new Error("Email already registered");

    const createdBarbershop = await this.barbershopRepository.create({
      id: barbershop._id,
      name: barbershop.name,
      email: barbershop.email,
      password: barbershop.password,
    });

    return createdBarbershop._id;
  }
}
