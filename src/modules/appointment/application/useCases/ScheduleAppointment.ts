import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Appointment } from "@modules/appointment/domain/appointment/Appointment";
import { AppointmentDate } from "@modules/appointment/domain/appointment/AppointmentDate";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";

import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError";
import { AppointmentAlreadyBookedError } from "./errors/AppointmentAlreadyBookedError";

interface Input {
  employeeId: string;
  clientId: string;
  date: Date;
}

type Output = Either<
  EmployeeNotFoundError | AppointmentAlreadyBookedError,
  string
>;

export class ScheduleAppointment implements IUseCase<Input, Output> {
  private readonly appointmentRepository: IAppointmentRepository;
  private readonly employeeRepository: IEmployeeRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(data: Input): Promise<Output> {
    const existentEmployee = await this.employeeRepository.findById(
      data.employeeId
    );

    if (!existentEmployee) {
      return left(new EmployeeNotFoundError());
    }

    const date = AppointmentDate.create(data.date);

    if (date.isLeft()) {
      return left(date.value);
    }

    const appointment = Appointment.create({
      employeeId: data.employeeId,
      clientId: data.clientId,
      date: date.value,
    });

    if (appointment.isLeft()) {
      return left(appointment.value);
    }

    const findAppointmentInSameDate =
      await this.appointmentRepository.findByDate(data.date, data.employeeId);

    if (findAppointmentInSameDate)
      return left(new AppointmentAlreadyBookedError());

    await this.appointmentRepository.create(appointment.value);

    return right(appointment.value.id);
  }
}
