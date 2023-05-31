import { AppointmentAvailability } from "~/domain/entity/AppointmentAvailability";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";

interface IListEmployeeMonthAvailability {
  employeeId: string;
  month: number;
  year: number;
}

export class ListEmployeeMonthAvailability {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: IListEmployeeMonthAvailability): Promise<
    {
      day: number;
      available: boolean;
    }[]
  > {
    const appointments =
      await this.appointmentRepository.findAllInMonthFromEmployee({
        month: data.month,
        year: data.year,
        employeeId: data.employeeId,
      });

    const appointmentAvailability = new AppointmentAvailability(appointments);

    const availability = appointmentAvailability.checkMonth({
      month: data.month,
      year: data.year,
    });

    return availability;
  }
}
