import { Either, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { AppointmentAvailability } from "@modules/appointment/domain/appointment/AppointmentAvailability";
import { IFindAllInDayFromEmployeeAppointmentRepository } from "@modules/appointment/application/repository/IFindAllInDayFromEmployeeAppointmentRepository";

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
    const appointments =
      await this.findAllInDayFromEmployeeAppointmentRepository.findAllInDayFromEmployee(
        {
          month: data.month,
          year: data.year,
          employeeId: data.employeeId,
          day: data.day,
        }
      );

    const appointmentAvailability = new AppointmentAvailability(appointments);

    const availability = appointmentAvailability.checkDay({
      day: data.day,
      month: data.month,
      year: data.year,
    });

    return right(availability);
  }
}
