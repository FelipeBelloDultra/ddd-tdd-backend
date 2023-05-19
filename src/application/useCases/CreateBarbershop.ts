// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

// Repository
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
import { IEmployeeRepository } from "../repository/IEmployeeRepository";

// Factory
import { IRepositoryFactory } from "../factory/IRepositoryFactory";

interface ICreateBarbershop {
  name: string;
  email: string;
  password: string;
}

export class CreateBarbershop {
  private readonly employeeRepository: IEmployeeRepository;
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(data: ICreateBarbershop): Promise<string> {
    const barbershop = new Barbershop(data);

    const existingEmployeeEmail = await this.employeeRepository.findByEmail(
      data.email
    );
    const existingBarbershopEmail = await this.barbershopRepository.findByEmail(
      data.email
    );

    if (existingEmployeeEmail || existingBarbershopEmail)
      throw new Error("Email already registered");

    const createdBarbershop = await this.barbershopRepository.create({
      id: barbershop._id,
      name: barbershop.name,
      email: barbershop.email,
      password: barbershop.password,
    });

    return createdBarbershop._id;
  }
}
