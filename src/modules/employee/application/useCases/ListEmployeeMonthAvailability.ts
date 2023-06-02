import { AppointmentAvailability } from "@modules/appointment/domain/AppointmentAvailability";
import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { Either, right } from "@core/logic/Either";

interface IListEmployeeMonthAvailability {
  employeeId: string;
  month: number;
  year: number;
}

type IListEmployeeMonthAvailabilityResponse = Either<
  void,
  {
    day: number;
    available: boolean;
  }[]
>;

export class ListEmployeeMonthAvailability {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(
    data: IListEmployeeMonthAvailability
  ): Promise<IListEmployeeMonthAvailabilityResponse> {
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

    return right(availability);
  }
}
