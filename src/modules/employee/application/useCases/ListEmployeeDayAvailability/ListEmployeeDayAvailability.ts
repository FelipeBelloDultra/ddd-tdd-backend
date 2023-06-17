import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { AppointmentAvailability } from "@modules/appointment/domain/appointment/AppointmentAvailability";
import { IFindAllInDayFromEmployeeAppointmentRepository } from "@modules/appointment/application/repository/IFindAllInDayFromEmployeeAppointmentRepository";

interface Input {
  employeeId: string;
  month?: number;
  year?: number;
  day?: number;
}

type Output = Either<
  void,
  {
    hour: number;
    available: boolean;
  }[]
>;

interface IListEmployeeDayAvailability {
  findAllInDayFromEmployeeAppointmentRepository: IFindAllInDayFromEmployeeAppointmentRepository;
}

export class ListEmployeeDayAvailability implements IUseCase<Input, Output> {
  private readonly findAllInDayFromEmployeeAppointmentRepository: IFindAllInDayFromEmployeeAppointmentRepository;

  constructor({
    findAllInDayFromEmployeeAppointmentRepository,
  }: IListEmployeeDayAvailability) {
    this.findAllInDayFromEmployeeAppointmentRepository =
      findAllInDayFromEmployeeAppointmentRepository;
  }

  public async execute(data: Input): Promise<Output> {
    const date = new Date();

    const dateValue = {
      month: data.month || date.getMonth() + 1,
      year: data.year || date.getFullYear(),
      day: data.day || date.getDate(),
    };

    const appointments =
      await this.findAllInDayFromEmployeeAppointmentRepository.findAllInDayFromEmployee(
        {
          day: dateValue.day,
          month: dateValue.month,
          year: dateValue.year,
          employeeId: data.employeeId,
        }
      );

    const appointmentAvailability = new AppointmentAvailability(appointments);

    const availability = appointmentAvailability.checkDay({
      day: dateValue.day,
      month: dateValue.month,
      year: dateValue.year,
    });

    return right(availability);
  }
}
