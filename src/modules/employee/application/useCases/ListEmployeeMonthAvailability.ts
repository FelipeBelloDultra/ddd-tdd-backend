import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { AppointmentAvailability } from "@modules/appointment/domain/appointment/AppointmentAvailability";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";

interface Input {
  employeeId: string;
  month: number;
  year: number;
}

type Output = Either<
  void,
  {
    day: number;
    available: boolean;
  }[]
>;

export class ListEmployeeMonthAvailability implements IUseCase<Input, Output> {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: Input): Promise<Output> {
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
