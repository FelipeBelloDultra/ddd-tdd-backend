import { AppointmentAvailability } from "@modules/appointment/domain/AppointmentAvailability";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { Either, right } from "@core/logic/Either";

interface IListEmployeeDayAvailability {
  employeeId: string;
  month: number;
  year: number;
  day: number;
}

type IListEmployeeDayAvailabilityResponse = Either<
  void,
  {
    hour: number;
    available: boolean;
  }[]
>;

export class ListEmployeeDayAvailability {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(
    data: IListEmployeeDayAvailability
  ): Promise<IListEmployeeDayAvailabilityResponse> {
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

    return right(availability);
  }
}
