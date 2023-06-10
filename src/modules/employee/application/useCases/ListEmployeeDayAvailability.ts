import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { AppointmentAvailability } from "@modules/appointment/domain/appointment/AppointmentAvailability";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";

interface Input {
  employeeId: string;
  month: number;
  year: number;
  day: number;
}

type Output = Either<
  void,
  {
    hour: number;
    available: boolean;
  }[]
>;

export class ListEmployeeDayAvailability implements IUseCase<Input, Output> {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: Input): Promise<Output> {
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
