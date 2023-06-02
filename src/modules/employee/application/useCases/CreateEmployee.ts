import { Employee } from "@modules/employee/domain/Employee";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { IBarbershopRepository } from "@modules/barbershop/application/repository/IBarbershopRepository";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { EmailValidatorService } from "@core/application/services/EmailValidatorService";

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
  private readonly emailValidatorService: EmailValidatorService;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
    this.barbershopRepository = repositoryFactory.createBarbershopRepository();

    this.emailValidatorService = new EmailValidatorService({
      barbershopRepository: repositoryFactory.createBarbershopRepository(),
      employeeRepository: repositoryFactory.createEmployeeRepository(),
      clientRepository: repositoryFactory.createClientRepository(),
    });
  }

  public async execute(data: ICreateEmployee): Promise<string> {
    const existingBarbershop = await this.barbershopRepository.findById(
      data.barbershopId
    );

    if (!existingBarbershop) throw new Error("Barbershop not found");

    if (await this.emailValidatorService.isUsed(data.email))
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
