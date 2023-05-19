import { Employee } from "~/domain/entity/Employee";
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";
import { IBarbershopRepository } from "~/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";

interface ICreateEmployee {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
}

export class CreateEmployee {
  private readonly employeeRepository: IEmployeeRepository;
  private readonly barbershopRepository: IBarbershopRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();
  }

  public async execute(data: ICreateEmployee): Promise<string> {
    const existingBarbershop = await this.barbershopRepository.findById(
      data.barbershopId
    );

    if (!existingBarbershop) throw new Error("Barbershop not found");

    const existingEmployeeEmail = await this.employeeRepository.findByEmail(
      data.email
    );
    const existingBarbershopEmail = await this.barbershopRepository.findByEmail(
      data.email
    );

    if (existingEmployeeEmail || existingBarbershopEmail)
      throw new Error("Email already registered");

    const employee = Employee.create({
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
      barbershopId: data.barbershopId,
      phone: data.phone,
    });

    const createdEmployee = await this.employeeRepository.create(employee);

    return createdEmployee.id;
  }
}
