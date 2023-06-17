import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { AppointmentAvailability } from "@modules/appointment/domain/appointment/AppointmentAvailability";
import { IFindAllInMonthFromEmployeeAppointmentRepository } from "@modules/appointment/application/repository/IFindAllInMonthFromEmployeeAppointmentRepository";

interface Input {
  employeeId: string;
  month?: number;
  year?: number;
}

type Output = Either<
  void,
  {
    day: number;
    available: boolean;
  }[]
>;

interface IListEmployeeMonthAvailability {
  findAllInMonthFromEmployeeAppointmentRepository: IFindAllInMonthFromEmployeeAppointmentRepository;
}

export class ListEmployeeMonthAvailability implements IUseCase<Input, Output> {
  private readonly findAllInMonthFromEmployeeAppointmentRepository: IFindAllInMonthFromEmployeeAppointmentRepository;

  constructor({
    findAllInMonthFromEmployeeAppointmentRepository,
  }: IListEmployeeMonthAvailability) {
    this.findAllInMonthFromEmployeeAppointmentRepository =
      findAllInMonthFromEmployeeAppointmentRepository;
  }

  public async execute(data: Input): Promise<Output> {
    const date = new Date();

    const dateValue = {
      month: data.month || date.getMonth() + 1,
      year: data.year || date.getFullYear(),
    };

    const appointments =
      await this.findAllInMonthFromEmployeeAppointmentRepository.findAllInMonthFromEmployee(
        {
          month: dateValue.month,
          year: dateValue.year,
          employeeId: data.employeeId,
        }
      );

    const appointmentAvailability = new AppointmentAvailability(appointments);

    const availability = appointmentAvailability.checkMonth({
      month: dateValue.month,
      year: dateValue.year,
    });

    return right(availability);
  }
}
