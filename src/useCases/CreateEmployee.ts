// Domain
import { Employee } from "~/domain/entity/Employee";
import { EmailValidator } from "~/domain/entity/EmailValidator";

// Repository interface
import { IEmployeeRepository } from "~/repositories/IEmployeeRepository";
import { IBarbershopRepository } from "~/repositories/IBarbershopRepository";

interface ICreateEmployee {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
}

export class CreateEmployee {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly emailValidator: EmailValidator
  ) {}

  public async execute(data: ICreateEmployee): Promise<string> {
    const existingBarbershop = await this.barbershopRepository.findById(
      data.barbershopId
    );
    if (!existingBarbershop) throw new Error("Barbershop not found");

    const usedEmail = await this.emailValidator.isEmailAlreadyUsed(data.email);

    if (usedEmail) throw new Error("Email already registered");

    const employee = new Employee({
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
      barbershopId: data.barbershopId,
      phone: data.phone,
    });

    const createdEmployee = await this.employeeRepository.create({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      avatarUrl: employee.avatarUrl,
      barbershopId: employee.barbershopId,
      phone: employee.phone,
    });

    return createdEmployee._id;
  }
}
