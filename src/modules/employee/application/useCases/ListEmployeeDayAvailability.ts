import { AppointmentAvailability } from "@modules/appointment/domain/entity/AppointmentAvailability";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";

interface IListEmployeeDayAvailability {
  employeeId: string;
  month: number;
  year: number;
  day: number;
}

export class ListEmployeeDayAvailability {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: IListEmployeeDayAvailability): Promise<
    {
      hour: number;
      available: boolean;
    }[]
  > {
    const appointments =
      await this.appointmentRepository.findAllInDayFromEmployee({
        month: data.month,
        year: data.year,
        employeeId: data.employeeId,
        day: data.day,
      });

    const appointmentAvailability = new AppointmentAvailability(appointments);

    const availability = appointmentAvailability.checkDay({
      day: data.day,
      month: data.month,
      year: data.year,
    });

    return availability;
  }
}